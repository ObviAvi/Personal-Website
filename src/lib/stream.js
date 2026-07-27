/**
 * Turns a list of output ops into either a plain string or a delayed
 * ReadableStream, so the same section renderers serve both `curl` (which
 * paints progressively) and `curl > file.txt` (which should not wait).
 */

const encoder = new TextEncoder();
const ESC = String.fromCharCode(27);
const CLEAR_LINE = `\r${ESC}[2K`;

export const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* op constructors ---------------------------------------------------- */

export const line = (text) => ({ kind: 'line', text });
export const lines = (list) => list.map(line);

/**
 * A line that types itself out. `prefix` is printed immediately, `text` is
 * revealed one visible character at a time, and `style` is reapplied to the
 * partial text on every frame — so styling never gets typed out as escape
 * bytes and the delay tracks characters a reader actually sees.
 */
export const type = (text, { prefix = '', style = (value) => value, speed = 30 } = {}) => ({
  kind: 'type',
  text,
  prefix,
  style,
  speed,
});

export const pause = (ms) => ({ kind: 'pause', ms });

/**
 * `render(frame)` draws one animation frame in place; `done` is the line left
 * behind afterwards, and the only thing shown when streaming is off.
 */
export const spinner = ({ ms = 500, render, done }) => ({ kind: 'spinner', ms, render, done });

/* rendering ---------------------------------------------------------- */

const settled = (op) => {
  if (op.kind === 'spinner') return op.done;
  if (op.kind === 'type') return op.prefix + op.style(op.text);
  return op.text;
};

/** Collapses ops to a single string, dropping anything purely temporal. */
export function flatten(ops) {
  return ops.filter((op) => op.kind !== 'pause').map(settled).join('\n') + '\n';
}

/**
 * Streams the ops with delays. Line output is emitted in batches sized so the
 * whole body lands inside `budgetMs` using at most `maxSteps` sleeps — Node's
 * timer resolution is coarse (~15 ms on Windows), so a per-line sleep on a
 * long page would drag the response out for many seconds.
 */
export function streamOps(ops, { budgetMs = 1100, maxSteps = 110 } = {}) {
  const lineCount = ops.reduce((total, op) => total + (op.kind === 'line' ? 1 : 0), 0);
  const steps = Math.max(1, Math.min(lineCount, maxSteps));
  const groupSize = Math.ceil(lineCount / steps);
  const stepDelay = Math.max(6, Math.round(budgetMs / steps));

  return new ReadableStream({
    async start(controller) {
      let open = true;
      let pending = [];

      const send = (text) => {
        if (!open) return;
        try {
          controller.enqueue(encoder.encode(text));
        } catch {
          // The client hung up (curl closed, or Ctrl-C); stop quietly.
          open = false;
        }
      };

      const flush = () => {
        if (!pending.length) return;
        send(pending.join('\n') + '\n');
        pending = [];
      };

      for (const op of ops) {
        if (!open) break;

        if (op.kind === 'line') {
          pending.push(op.text);
          if (pending.length >= groupSize) {
            flush();
            await sleep(stepDelay);
          }
          continue;
        }

        flush();

        if (op.kind === 'pause') {
          await sleep(op.ms);
          continue;
        }

        if (op.kind === 'spinner') {
          const started = Date.now();
          let frame = 0;
          while (open && Date.now() - started < op.ms) {
            send(CLEAR_LINE + op.render(SPINNER_FRAMES[frame % SPINNER_FRAMES.length]));
            frame += 1;
            await sleep(80);
          }
          send(CLEAR_LINE + op.done + '\n');
          continue;
        }

        if (op.kind === 'type') {
          for (let index = 1; index <= op.text.length; index += 1) {
            if (!open) break;
            send(CLEAR_LINE + op.prefix + op.style(op.text.slice(0, index)));
            await sleep(op.speed);
          }
          send('\n');
        }
      }

      flush();

      if (open) {
        try {
          controller.close();
        } catch {
          // Already closed by the client.
        }
      }
    },
  });
}

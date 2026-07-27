// Minimal ANSI + text-layout helpers for the curl-facing terminal output.
// No dependencies: this runs in the Next.js node runtime with no DOM.

const CSI = String.fromCharCode(27) + '[';
const ANSI_PATTERN = new RegExp(String.fromCharCode(27) + '\\[[0-9;]*m', 'g');

// Site accent, dark theme (--accent: #d99a4e). Truecolor, so the terminal
// output matches the site on terminals that support it.
const ACCENT = CSI + '38;2;217;154;78m';
const RESET = CSI + '0m';

export function stripAnsi(value) {
  return String(value).replace(ANSI_PATTERN, '');
}

export function visibleLength(value) {
  return stripAnsi(value).length;
}

/**
 * Builds the style functions. When `color` is false every style is the
 * identity function, so the same rendering code produces clean plain text.
 */
export function createStyles(color) {
  const wrap = (open, close) => (value) => (color ? open + value + close : String(value));

  return {
    accent: wrap(ACCENT, RESET),
    bold: wrap(CSI + '1m', CSI + '22m'),
    dim: wrap(CSI + '2m', CSI + '22m'),
    underline: wrap(CSI + '4m', CSI + '24m'),
    // Bold + accent, used for section headings.
    heading: wrap(CSI + '1m' + ACCENT, RESET),
  };
}

/**
 * Greedy word wrap. Tokens longer than the width (URLs) are left intact and
 * allowed to overflow rather than being broken, so they stay copy-pasteable.
 */
export function wrapText(text, width) {
  const words = String(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [''];

  const lines = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    if (visibleLength(current) + 1 + visibleLength(word) <= width) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

/** Wraps text and prefixes every resulting line with `indent` spaces. */
export function indentWrap(text, width, indent) {
  const pad = ' '.repeat(indent);
  return wrapText(text, Math.max(20, width - indent)).map((line) => pad + line);
}

/**
 * Wraps text as a bullet: the marker sits on the first line, continuation
 * lines align under the text.
 */
export function bullet(text, width, indent, marker = '-') {
  const pad = ' '.repeat(indent);
  const hang = ' '.repeat(indent + marker.length + 1);
  const lines = wrapText(text, Math.max(20, width - indent - marker.length - 1));
  return lines.map((line, index) => (index === 0 ? pad + marker + ' ' + line : hang + line));
}

/**
 * Lays items out in aligned columns that fit the width. Falls back to a single
 * column on narrow terminals.
 */
export function columns(items, width, indent = 2, gutter = 2) {
  if (!items.length) return [];

  const usable = Math.max(20, width - indent);
  const longest = Math.max(...items.map((item) => item.length));
  const cellWidth = longest + gutter;
  const count = Math.max(1, Math.floor(usable / cellWidth));
  const rows = Math.ceil(items.length / count);
  const pad = ' '.repeat(indent);
  const lines = [];

  // Column-major so the list still reads top-to-bottom.
  for (let row = 0; row < rows; row += 1) {
    let line = '';
    for (let col = 0; col < count; col += 1) {
      const item = items[col * rows + row];
      if (!item) continue;
      line += col === count - 1 ? item : item.padEnd(cellWidth, ' ');
    }
    lines.push((pad + line).trimEnd());
  }

  return lines;
}

/** A dimmed horizontal rule. */
export function rule(width, styles, { ascii = false, indent = 2 } = {}) {
  const char = ascii ? '-' : '─';
  return ' '.repeat(indent) + styles.dim(char.repeat(Math.max(10, width - indent * 2)));
}

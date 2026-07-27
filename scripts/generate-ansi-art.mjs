/**
 * Precomputes terminal art for the curl output.
 *
 * Images are rendered with the half-block technique: each character cell is
 * the upper-half block U+2580, whose foreground paints the top pixel and whose
 * background paints the bottom one. That gives two vertical pixels per cell,
 * so a terminal cell (roughly 1:2) ends up holding two square pixels and the
 * aspect ratio survives.
 *
 * Run with `npm run art` after changing any source image. Output is committed,
 * so neither the build nor the request path needs sharp.
 *
 *   node scripts/generate-ansi-art.mjs
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'src', 'content', 'ansi-art.js');

const ESC = String.fromCharCode(27);
const ACCENT = [217, 154, 78];

// The dark theme's --panel-alt, used behind transparent cover art.
const BACKDROP = '#15171b';

// Luminance ramp for the no-color fallback, darkest to lightest.
const RAMP = ' .:-=+*#%@';

const SOURCES = [
  { key: 'banner', file: 'A-Icon.png', width: 30, mode: 'logo' },
  { key: 'BoilerCheck', file: 'https://raw.githubusercontent.com/ObviAvi/BoilerCheck/main/Boilercheck.png', width: 44, height: 28 },
  { key: 'machine(learn);', file: 'machine-learn-cover.png', width: 44, height: 28 },
  {
    key: 'Clariti',
    file: 'https://raw.githubusercontent.com/ObviAvi/Clariti/master/frontend/assets/images/clariti-transparent-beige.png',
    width: 44,
    height: 28,
  },
  { key: 'Nook', file: 'nook-cover.png', width: 44, height: 28 },
  { key: 'Folyo', file: 'folyo_logo.png', width: 44, height: 28 },
  { key: 'Scholar Seek', file: 'ScholarSeek.png', width: 44, height: 28 },
];

async function loadImage(source) {
  if (source.startsWith('http')) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`fetch failed (${response.status}) for ${source}`);
    return Buffer.from(await response.arrayBuffer());
  }
  return path.join(PUBLIC, source);
}

/** Rounds to a multiple of 8 so identical-looking neighbours share a color run. */
const quantize = (value) => Math.min(255, Math.round(value / 8) * 8);

function luminance([r, g, b]) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Logo recolor: the mark is white on black, so brightness becomes opacity and
 * the accent becomes the ink. Saturated pixels (the red dot) keep their hue.
 */
function recolorLogo(pixel) {
  const [r, g, b, a] = pixel;
  if (a < 40) return null;

  const lum = luminance([r, g, b]);
  if (lum < 0.12) return null;

  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  if (saturation > 45) return [r, g, b];

  return ACCENT.map((channel) => Math.round(channel * Math.min(1, lum + 0.15)));
}

function readPixel(data, width, x, y) {
  const offset = (y * width + x) * 4;
  return [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]];
}

function encodeRow(cells) {
  let out = '';
  let currentFg = null;
  let currentBg = null;

  for (const { fg, bg, char } of cells) {
    // Truecolor channels are semicolon-separated: ESC[38;2;R;G;Bm
    const fgKey = fg ? fg.join(';') : null;
    const bgKey = bg ? bg.join(';') : null;

    if (fgKey !== currentFg) {
      out += fg ? `${ESC}[38;2;${fgKey}m` : `${ESC}[39m`;
      currentFg = fgKey;
    }
    if (bgKey !== currentBg) {
      out += bg ? `${ESC}[48;2;${bgKey}m` : `${ESC}[49m`;
      currentBg = bgKey;
    }

    out += char;
  }

  return out + `${ESC}[0m`;
}

async function render({ file, width, height, mode }) {
  const input = await loadImage(file);

  let pipeline = sharp(input);

  // Covers are composited at full resolution first: downscaling a huge mostly
  // transparent PNG averages its alpha away and the artwork disappears.
  if (mode !== 'logo') pipeline = pipeline.flatten({ background: BACKDROP });

  // `height` caps how tall a square-ish image gets, in pixels (2 per row).
  pipeline = pipeline.resize({ width, height, fit: 'inside', kernel: 'lanczos3' });
  const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const rows = Math.floor(info.height / 2);
  const grid = [];

  for (let row = 0; row < rows; row += 1) {
    const cells = [];
    const levels = [];

    for (let x = 0; x < info.width; x += 1) {
      const rawTop = readPixel(data, info.width, x, row * 2);
      const rawBottom = readPixel(data, info.width, x, row * 2 + 1);

      const top = mode === 'logo' ? recolorLogo(rawTop) : rawTop[3] < 40 ? null : rawTop.slice(0, 3);
      const bottom = mode === 'logo' ? recolorLogo(rawBottom) : rawBottom[3] < 40 ? null : rawBottom.slice(0, 3);

      const q = (pixel) => (pixel ? pixel.map(quantize) : null);

      if (!top && !bottom) cells.push({ fg: null, bg: null, char: ' ' });
      else if (top && !bottom) cells.push({ fg: q(top), bg: null, char: '▀' });
      else if (!top && bottom) cells.push({ fg: q(bottom), bg: null, char: '▄' });
      else cells.push({ fg: q(top), bg: q(bottom), char: '▀' });

      const visible = [top, bottom].filter(Boolean);
      levels.push(
        visible.length ? visible.reduce((sum, pixel) => sum + luminance(pixel), 0) / visible.length : null,
      );
    }

    grid.push({ cells, levels, opaque: levels.some((level) => level !== null) });
  }

  // Drop fully transparent rows above and below the subject.
  let first = 0;
  let last = grid.length - 1;
  while (first <= last && !grid[first].opaque) first += 1;
  while (last >= first && !grid[last].opaque) last -= 1;
  const visibleRows = grid.slice(first, last + 1);

  // Stretch the ascii ramp across the image's actual luminance range, so a
  // dark cover does not flatten into blank space.
  const allLevels = visibleRows.flatMap((row) => row.levels).filter((level) => level !== null);
  const min = allLevels.length ? Math.min(...allLevels) : 0;
  const max = allLevels.length ? Math.max(...allLevels) : 1;
  const span = max - min || 1;

  const color = visibleRows.map((row) => encodeRow(row.cells));
  const ascii = visibleRows.map((row) =>
    row.levels
      .map((level) => {
        if (level === null) return ' ';
        const normalized = (level - min) / span;
        return RAMP[Math.min(RAMP.length - 1, Math.max(0, Math.round(normalized * (RAMP.length - 1))))];
      })
      .join('')
      .trimEnd(),
  );

  return { color, ascii, width: info.width, rows: visibleRows.length };
}

const banner = {};
const projectArt = {};

for (const source of SOURCES) {
  process.stdout.write(`rendering ${source.key} ... `);
  try {
    const art = await render(source);
    if (source.key === 'banner') Object.assign(banner, art);
    else projectArt[source.key] = art;
    console.log(`${art.width}x${art.rows} cells`);
  } catch (error) {
    console.log(`skipped (${error.message})`);
  }
}

const file = `// Generated by scripts/generate-ansi-art.mjs — do not edit by hand.
// Regenerate with \`npm run art\` after changing any source image.

export const banner = ${JSON.stringify(banner, null, 2)};

export const projectArt = ${JSON.stringify(projectArt, null, 2)};
`;

await writeFile(OUT, file, 'utf8');
console.log(`\nwrote ${path.relative(ROOT, OUT)} (${(file.length / 1024).toFixed(1)} KB)`);

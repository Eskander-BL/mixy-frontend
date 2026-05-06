// Génère des versions WebP optimisées des assets de marque (PNG + SVG raster).
// Idempotent : ne touche pas aux originaux, écrit les .webp à côté.
//
//   pnpm optimize:images
//
// Cibles : on rasterise aussi les SVG qui contiennent un PNG en base64 (chat-bot, dj)
// car ils sont rendus à taille fixe et leur poids actuel (>2 MB) tue le LCP mobile.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRAND_DIR = path.join(ROOT, "client", "src", "assets", "brand");
const LOGO_FILE = path.join(ROOT, "client", "src", "assets", "logo.png");

/**
 * @typedef {Object} Target
 * @property {string} input  Absolute path to the source image.
 * @property {string} output Absolute path of the .webp output.
 * @property {number} width  Maximum rendered width (px). Used to downscale if source is bigger.
 * @property {number} quality 1..100 webp quality (80 = good balance for UI illustrations).
 */

/** @type {Target[]} */
const TARGETS = [
  // Logo Mixy header / Home : rendu à ~h-20 (=80px) sur mobile, ~h-28 sur desktop.
  // On vise une largeur de 480px (2x retina) qui suffit largement.
  {
    input: LOGO_FILE,
    output: path.join(path.dirname(LOGO_FILE), "logo.webp"),
    width: 480,
    quality: 88,
  },
  // Mascotte Home / Dashboard / fallback CoursePage : rendu max ~144px côté.
  {
    input: path.join(BRAND_DIR, "mixy-read-crop-4x.png"),
    output: path.join(BRAND_DIR, "mixy-read-crop-4x.webp"),
    width: 384,
    quality: 82,
  },
  // Mascotte Quiz Home : rendu max ~144px côté, source actuelle 2 MB.
  {
    input: path.join(BRAND_DIR, "quizz-mixy.png"),
    output: path.join(BRAND_DIR, "quizz-mixy.webp"),
    width: 384,
    quality: 82,
  },
  // Écran de paywall, plein héros : on garde un peu plus de largeur pour la qualité.
  {
    input: path.join(BRAND_DIR, "mixy-unlock.png"),
    output: path.join(BRAND_DIR, "mixy-unlock.webp"),
    width: 640,
    quality: 82,
  },
  // Mascottes feedback quiz : ~80px de côté, on peut être agressif.
  {
    input: path.join(BRAND_DIR, "bien.png"),
    output: path.join(BRAND_DIR, "bien.webp"),
    width: 256,
    quality: 80,
  },
  {
    input: path.join(BRAND_DIR, "pasbien.png"),
    output: path.join(BRAND_DIR, "pasbien.webp"),
    width: 256,
    quality: 80,
  },
  {
    input: path.join(BRAND_DIR, "super.png"),
    output: path.join(BRAND_DIR, "super.webp"),
    width: 256,
    quality: 80,
  },
  {
    input: path.join(BRAND_DIR, "reding.png"),
    output: path.join(BRAND_DIR, "reding.webp"),
    width: 384,
    quality: 80,
  },
  // SVG porteurs d'un PNG base64 (rasterisation directe via librsvg de sharp).
  {
    input: path.join(BRAND_DIR, "chat-bot.svg"),
    output: path.join(BRAND_DIR, "chat-bot.webp"),
    width: 384,
    quality: 82,
  },
  {
    input: path.join(BRAND_DIR, "dj.svg"),
    output: path.join(BRAND_DIR, "dj.webp"),
    width: 384,
    quality: 82,
  },
];

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function processTarget(target) {
  if (!(await exists(target.input))) {
    console.warn(`[skip] ${path.relative(ROOT, target.input)} (not found)`);
    return null;
  }
  const inputBuf = await fs.readFile(target.input);
  const inputBytes = inputBuf.length;

  // density=2 améliore la qualité du raster pour les SVG.
  const pipeline = sharp(inputBuf, { density: 192 })
    .resize({ width: target.width, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: target.quality, effort: 6 });

  const out = await pipeline.toBuffer();
  await fs.writeFile(target.output, out);

  return {
    name: path.relative(ROOT, target.input),
    out: path.relative(ROOT, target.output),
    inputBytes,
    outputBytes: out.length,
  };
}

async function main() {
  const results = [];
  for (const target of TARGETS) {
    const r = await processTarget(target);
    if (r) results.push(r);
  }

  let totalIn = 0;
  let totalOut = 0;
  for (const r of results) {
    totalIn += r.inputBytes;
    totalOut += r.outputBytes;
    const saved = r.inputBytes - r.outputBytes;
    const pct = ((saved / r.inputBytes) * 100).toFixed(1);
    console.log(
      `${r.name.padEnd(50)} ${fmtBytes(r.inputBytes).padStart(10)} -> ${fmtBytes(r.outputBytes).padStart(10)}  (-${pct}%)`,
    );
  }
  console.log("-".repeat(80));
  console.log(
    `TOTAL ${fmtBytes(totalIn)} -> ${fmtBytes(totalOut)}  saved ${fmtBytes(totalIn - totalOut)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

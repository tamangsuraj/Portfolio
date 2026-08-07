/**
 * Generates responsive AVIF/WebP/fallback variants for the site's raster images.
 *
 * Motivation, measured: public/profile.png shipped at 1.31 MB — a single
 * decorative portrait costing more than the entire JavaScript bundle. On a
 * Nepali mobile connection that alone is several seconds. AVIF at a sensible
 * width lands it around 15–30 kB for the same visual result.
 *
 * Outputs to public/img/<name>-<width>.<ext>. Source files stay untouched in
 * public/ so this can be re-run safely.
 *
 * Run: npm run images
 */

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

/**
 * Sources live outside public/ so the full-resolution originals are never
 * deployed — only the generated variants are.
 */
const SRC = join(process.cwd(), "assets-src");
const PUBLIC = join(process.cwd(), "public");
const OUT = join(PUBLIC, "img");

/** Widths to emit. Keep the set small — every variant is another build artefact. */
const WIDTHS = [480, 768, 1200];

/** Images to process, with the intrinsic display size they are used at. */
const TARGETS = [
  { file: "profile.png", widths: [240, 480, 960], alt: "Portrait" },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

async function processImage(target) {
  const source = join(SRC, target.file);
  if (!existsSync(source)) {
    console.warn(`  ! ${target.file} not found, skipping`);
    return;
  }

  const { name } = parse(target.file);
  const before = (await stat(source)).size;
  const meta = await sharp(source).metadata();
  const widths = (target.widths ?? WIDTHS).filter((w) => w <= (meta.width ?? Infinity));

  let after = 0;
  const written = [];

  for (const width of widths) {
    const base = sharp(source).resize({ width, withoutEnlargement: true });

    // AVIF first — best compression, and every browser that matters supports
    // it now. WebP is the fallback for older Safari/Firefox builds.
    const avif = await base.clone().avif({ quality: 62, effort: 5 }).toBuffer();
    const webp = await base.clone().webp({ quality: 78 }).toBuffer();

    await writeFile(join(OUT, `${name}-${width}.avif`), avif);
    await writeFile(join(OUT, `${name}-${width}.webp`), webp);

    after += avif.length;
    written.push(`${name}-${width}: avif ${kb(avif.length)} / webp ${kb(webp.length)}`);
  }

  // One PNG fallback at the smallest width for anything ancient.
  const fallbackWidth = widths[0];
  const png = await sharp(source)
    .resize({ width: fallbackWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  await writeFile(join(OUT, `${name}-${fallbackWidth}.png`), png);

  console.log(`\n  ${target.file}  ${kb(before)} → ${kb(after)} (AVIF set)`);
  for (const line of written) console.log(`    ${line}`);
  console.log(`    ${name}-${fallbackWidth}.png fallback ${kb(png.length)}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const target of TARGETS) {
    await processImage(target);
  }

  // Warn about anything large sitting directly in public/ — those ship as-is.
  const stragglers = [];
  for (const entry of await readdir(PUBLIC)) {
    if (!/\.(png|jpe?g)$/i.test(entry)) continue;
    const size = (await stat(join(PUBLIC, entry))).size;
    if (size > 150 * 1024) stragglers.push(`${entry} (${kb(size)})`);
  }
  if (stragglers.length) {
    console.log(`\n  ⚠ Unoptimised images over 150 kB still in public/:`);
    for (const s of stragglers) console.log(`    ${s}`);
  }

  console.log("\n✓ Image variants written to public/img/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

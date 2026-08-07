/**
 * Post-build fixups that have to happen against dist/.
 *
 * 1. Vercel's static hosting serves `404.html` from the output root for any
 *    unmatched path, and returns a real HTTP 404 with it. vite-react-ssg emits
 *    the catch-all route as `404/index.html`, so we copy it up. Without this,
 *    unknown URLs fall back to Vercel's generic error page and the carefully
 *    built 404 route never appears.
 *
 * 2. Removes the `/404/` directory from the output so the page cannot be
 *    indexed as a real URL of its own.
 */

import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const DIST = join(process.cwd(), "dist");
const SOURCE = join(DIST, "404", "index.html");
const TARGET = join(DIST, "404.html");

function main() {
  if (!existsSync(SOURCE)) {
    console.error("✗ dist/404/index.html not found — check includedRoutes in vite.config.ts");
    process.exit(1);
  }

  copyFileSync(SOURCE, TARGET);
  rmSync(join(DIST, "404"), { recursive: true, force: true });

  console.log("✓ 404.html promoted to output root");
}

main();

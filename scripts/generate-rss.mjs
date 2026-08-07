/**
 * Generates dist/rss.xml for the blog.
 *
 * Posts are read from src/data/posts.json, which does not exist yet — the blog
 * launches in the content phase. Until then this emits a valid, empty channel
 * so /rss.xml resolves rather than 404s (index.html advertises the feed via
 * <link rel="alternate">, and a 404 there is a small but real trust signal).
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL, xmlEscape } from "./_routes.mjs";

const DIST = join(process.cwd(), "dist");
const POSTS = join(process.cwd(), "src", "data", "posts.json");

const CHANNEL = {
  title: "Suraj Tamang — Blog",
  description:
    "Practical writing on Power BI, MIS reporting, Excel and Google Sheets automation, and building websites that win customers for businesses in Nepal.",
  language: "en",
  author: "Suraj Tamang",
};

function loadPosts() {
  if (!existsSync(POSTS)) return [];
  try {
    const posts = JSON.parse(readFileSync(POSTS, "utf8"));
    return posts
      .filter((post) => post.published !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error(`  ! could not parse ${POSTS}: ${err.message}`);
    process.exit(1);
  }
}

function main() {
  if (!existsSync(DIST)) {
    console.error("dist/ not found — run the build first.");
    process.exit(1);
  }

  const posts = loadPosts();
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`;
      return [
        "    <item>",
        `      <title>${xmlEscape(post.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        `      <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `      <description>${xmlEscape(post.excerpt ?? "")}</description>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        post.category ? `      <category>${xmlEscape(post.category)}</category>` : null,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${xmlEscape(CHANNEL.title)}</title>`,
    `    <link>${SITE_URL}/blog/</link>`,
    `    <description>${xmlEscape(CHANNEL.description)}</description>`,
    `    <language>${CHANNEL.language}</language>`,
    `    <lastBuildDate>${now}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  writeFileSync(join(DIST, "rss.xml"), xml, "utf8");
  console.log(`✓ rss.xml — ${posts.length} item(s)`);
}

main();

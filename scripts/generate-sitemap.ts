import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://lorenzogm.com";
const CONTENT_DIR = path.resolve("content");

function getSlugs(lang: string): { slug: string; date: string }[] {
  const suffix = `.${lang}.md`;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(suffix));
  const results: { slug: string; date: string }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(suffix, "");
    const date =
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date || "");
    results.push({ slug, date });
  }
  return results;
}

function buildSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  const urls: { loc: string; lastmod: string; priority: string }[] = [];

  // Homepage
  urls.push({ loc: `${SITE_URL}/en/`, lastmod: today, priority: "1.0" });
  urls.push({ loc: `${SITE_URL}/es/`, lastmod: today, priority: "1.0" });

  // Topics pages
  urls.push({
    loc: `${SITE_URL}/en/topics/`,
    lastmod: today,
    priority: "0.6",
  });
  urls.push({
    loc: `${SITE_URL}/es/topics/`,
    lastmod: today,
    priority: "0.6",
  });

  // Blog posts
  for (const lang of ["en", "es"]) {
    const posts = getSlugs(lang);
    for (const { slug, date } of posts) {
      urls.push({
        loc: `${SITE_URL}/${lang}/blog/${slug}`,
        lastmod: date || today,
        priority: "0.8",
      });
    }
  }

  const entries = urls
    .map(
      ({ loc, lastmod, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const sitemap = buildSitemap();
const outDir = path.resolve("public");
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
console.log(`Sitemap generated with ${sitemap.split("<url>").length - 1} URLs`);

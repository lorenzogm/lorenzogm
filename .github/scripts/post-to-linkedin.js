// @ts-check
/**
 * Posts the latest published article to LinkedIn.
 *
 * Required environment variable:
 *   LINKEDIN_ACCESS_TOKEN – OAuth 2.0 access token with the `w_member_social` scope.
 *
 * Optional environment variable:
 *   WEBSITE_URL – Base URL of the blog (default: https://lorenzogm.com)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Parse the YAML front-matter block at the top of a markdown file. */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.substring(0, colonIdx).trim();
    let value = line.substring(colonIdx + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }
  return data;
}

/** Return the most-recently published English article (no future dates). */
function getLatestPublishedArticle() {
  const contentDir = path.join(__dirname, "..", "..", "content");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".en.md"));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const articles = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const fm = parseFrontmatter(raw);
    if (!fm) continue;

    const date = new Date(fm.date);
    if (isNaN(date.getTime())) continue;
    if (date > today) continue; // skip scheduled/future posts

    const excerpt = fm.description || fm.excerpt || "";
    if (!excerpt) {
      console.warn(`Article ${file} has no description/excerpt – skipping.`);
      continue;
    }

    articles.push({
      slug: file.replace(".en.md", ""),
      title: fm.title || "Untitled",
      date,
      excerpt,
    });
  }

  // Sort newest first
  articles.sort((a, b) => b.date - a.date);

  return articles[0] || null;
}

/** Fetch the LinkedIn member URN for the authenticated user. */
async function getMemberUrn(accessToken) {
  const res = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch LinkedIn user info (${res.status}): ${body}`
    );
  }

  const json = await res.json();
  // `sub` is the OpenID Connect subject – the member's ID
  const personId = json.sub;
  if (!personId) {
    throw new Error(
      `LinkedIn userinfo response did not contain a 'sub' field: ${JSON.stringify(json)}`
    );
  }

  return `urn:li:person:${personId}`;
}

/** Post the article excerpt + link to LinkedIn on behalf of the authenticated user. */
async function postToLinkedIn(article) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("LINKEDIN_ACCESS_TOKEN environment variable is not set.");
  }

  const authorUrn = await getMemberUrn(accessToken);
  console.log(`Posting as: ${authorUrn}`);

  const websiteUrl = (
    process.env.WEBSITE_URL || "https://lorenzogm.com"
  ).replace(/\/$/, "");
  const articleUrl = `${websiteUrl}/blog/${article.slug}`;

  const postText = `${article.excerpt}\n\n${articleUrl}`;

  const body = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: postText },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(
      `LinkedIn ugcPosts API error (POST https://api.linkedin.com/v2/ugcPosts, status ${res.status}): ${errBody}`
    );
  }

  const result = await res.json();
  console.log("LinkedIn post created:", result.id ?? JSON.stringify(result));
  return result;
}

async function main() {
  const article = getLatestPublishedArticle();

  if (!article) {
    console.log("No published articles found – nothing to post.");
    return;
  }

  console.log(
    `Latest published article: "${article.title}" (${article.date.toISOString().split("T")[0]})`
  );
  console.log(`Excerpt: ${article.excerpt}`);

  await postToLinkedIn(article);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

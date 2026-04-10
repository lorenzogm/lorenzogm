import { type ConsoleMessage, expect, type Page, test } from "@playwright/test";

const BLOG_TITLE_REGEX = /Lorenzo GM/;

const IGNORED_ERROR_PATTERNS = [
  "favicon",
  "ERR_UNKNOWN_URL_SCHEME",
  "Minified React error #418",
];

function isRelevantError(error: string): boolean {
  return IGNORED_ERROR_PATTERNS.every((pattern) => !error.includes(pattern));
}

// Collect console errors during page lifecycle
function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });
  page.on("pageerror", (err: Error) => {
    errors.push(err.message);
  });
  return errors;
}

test.describe("No console errors", () => {
  test("home page has no console errors", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    expect(errors.filter(isRelevantError)).toEqual([]);
  });

  test("blog post page has no console errors", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/en/blog/a-better-react-folder-structure", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    expect(errors.filter(isRelevantError)).toEqual([]);
  });

  test("client-side navigation has no console errors", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    await page.locator("article a").first().click();
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    expect(errors.filter(isRelevantError)).toEqual([]);
  });
});

test.describe("Styles are loaded", () => {
  test("home page has stylesheets and styled content", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });

    // Verify at least one stylesheet is linked
    const stylesheetCount = await page.evaluate(
      () => document.querySelectorAll('link[rel="stylesheet"]').length
    );
    expect(stylesheetCount).toBeGreaterThan(0);

    // Verify Tailwind CSS is applied — bg-white computes to rgb(255, 255, 255),
    // not rgba(0, 0, 0, 0) (transparent) which indicates missing CSS
    const headerBgColor = await page
      .locator("header")
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(headerBgColor).not.toBe("rgba(0, 0, 0, 0)");

    // Verify flexbox layout is applied (min-h-screen)
    const bodyDisplay = await page.evaluate(() => {
      const el = document.querySelector("body > div");
      return el ? getComputedStyle(el).display : "none";
    });
    expect(bodyDisplay).toBe("flex");
  });

  test("blog post page has stylesheets and styled content", async ({
    page,
  }) => {
    await page.goto("/en/blog/a-better-react-folder-structure", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });

    const stylesheetCount = await page.evaluate(
      () => document.querySelectorAll('link[rel="stylesheet"]').length
    );
    expect(stylesheetCount).toBeGreaterThan(0);
  });
});

test.describe("No broken resources", () => {
  test("home page has no failed network requests", async ({ page }) => {
    const failedRequests: string[] = [];
    page.on("requestfailed", (req) => {
      const url = req.url();
      // Ignore non-app requests: encrypted: scheme (analytics), Vercel internals, aborted navigations
      if (
        url.startsWith("encrypted:") ||
        url.includes("/.well-known/") ||
        req.failure()?.errorText === "net::ERR_ABORTED"
      ) {
        return;
      }
      failedRequests.push(`${req.failure()?.errorText}: ${url}`);
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    expect(failedRequests).toEqual([]);
  });

  test("no broken internal links on home page", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });

    const internalLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a[href]"));
      return links
        .map((a) => a.getAttribute("href") || "")
        .filter((href) => href.startsWith("/"));
    });

    // Verify internal links are well-formed
    for (const href of internalLinks) {
      expect(href).not.toContain("undefined");
      expect(href).not.toContain("null");
    }
  });
});

test.describe("Meta tags and SEO", () => {
  test("home page has required meta tags", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Check essential meta tags exist
    const charset = await page.evaluate(
      () => !!document.querySelector("meta[charset]")
    );
    expect(charset).toBe(true);

    const viewport = await page.evaluate(() =>
      document.querySelector('meta[name="viewport"]')?.getAttribute("content")
    );
    expect(viewport).toContain("width=device-width");

    // Verify title is set
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
  });

  test("blog post has proper title", async ({ page }) => {
    await page.goto("/en/blog/a-better-react-folder-structure", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
  });
});

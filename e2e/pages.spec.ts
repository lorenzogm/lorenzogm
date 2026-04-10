import { expect, test } from "@playwright/test";

const BLOG_TITLE_REGEX = /Lorenzo GM/;

test.describe("Home page", () => {
  test("loads and shows blog posts", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
    // At least one article card should be visible after React hydrates
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
  });
});

test.describe("English blog post pages", () => {
  test("loads a-better-react-folder-structure directly", async ({ page }) => {
    await page.goto("/blog/a-better-react-folder-structure", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
    // The article element contains the rendered markdown content
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator("h1").nth(1)).toContainText(
      "A Better React Folder Structure",
      { timeout: 15_000 }
    );
  });

  test("loads array-types-in-typescript directly", async ({ page }) => {
    await page.goto("/blog/array-types-in-typescript", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("shows 404 for unknown slug", async ({ page }) => {
    await page.goto("/blog/this-slug-does-not-exist", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("text=Post Not Found").first()).toBeVisible({
      timeout: 15_000,
    });
  });
});

test.describe("Spanish home page", () => {
  test("loads /es/ directly", async ({ page }) => {
    await page.goto("/es/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
  });
});

test.describe("Spanish blog post pages", () => {
  test("loads a-better-react-folder-structure in Spanish directly", async ({
    page,
  }) => {
    await page.goto("/es/blog/a-better-react-folder-structure", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveTitle(BLOG_TITLE_REGEX);
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator("h1").first()).not.toHaveText(
      "Artículo No Encontrado"
    );
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
  });
});

test.describe("Client-side navigation", () => {
  test("navigates from home to an article and back", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for blog cards to render
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    // Click the first blog post link inside an article
    const firstLink = page.locator("article a").first();
    await expect(firstLink).toBeVisible({ timeout: 15_000 });
    await firstLink.click();
    // Should be on an article page with rendered markdown content
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    // Go back
    await page.goBack();
    await expect(page).toHaveURL("/");
  });
});

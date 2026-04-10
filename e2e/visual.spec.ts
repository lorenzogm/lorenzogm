import { expect, test } from "@playwright/test";

test.describe("Visual regression", () => {
  test("home page matches snapshot", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    // Wait for images to load and layout to stabilize
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("blog post page matches snapshot", async ({ page }) => {
    await page.goto("/blog/a-better-react-folder-structure");
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("blog-post.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("styles are loaded (no unstyled content)", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("article").first()).toBeVisible({
      timeout: 15_000,
    });

    // Verify CSS is loaded by checking computed styles
    const headerBgColor = await page
      .locator("header")
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    // If Tailwind CSS is loaded, bg-white computes to rgb(255, 255, 255)
    // If no CSS is loaded, it defaults to rgba(0, 0, 0, 0) (transparent)
    expect(headerBgColor).not.toBe("rgba(0, 0, 0, 0)");

    // Verify a stylesheet link exists in the document
    const stylesheetCount = await page.evaluate(
      () =>
        document.querySelectorAll('link[rel="stylesheet"]').length +
        document.querySelectorAll("style").length
    );
    expect(stylesheetCount).toBeGreaterThan(0);
  });
});

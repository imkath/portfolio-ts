import { test, expect } from "@playwright/test";

test.describe("Keyboard Navigation Tests", () => {
  test("Filter chips should be keyboard accessible", async ({ page }) => {
    await page.goto("/work");
    await page.waitForLoadState("networkidle");

    // Focus on first filter button using Tab
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Find and focus a filter button
    const filterButton = page
      .getByRole("button", { name: /Filtrar por/i })
      .first();
    await filterButton.focus();

    // Check if button is focused
    await expect(filterButton).toBeFocused();

    // Activate with Enter
    await page.keyboard.press("Enter");

    // Wait for filter to apply
    await page.waitForTimeout(500);
  });

  test("Project cards should be keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Tab to first project card
    const projectLinks = page.locator('a[href^="/work/"]');
    const firstProject = projectLinks.first();

    await firstProject.focus();
    await expect(firstProject).toBeFocused();

    // Navigate with Enter
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/work\/.+/);

    expect(page.url()).toContain("/work/");
  });

  test("Lightbox controls should be keyboard accessible", async ({ page }) => {
    // Navigate to a project
    await page.goto("/work");
    await page.waitForLoadState("networkidle");

    const firstProject = page.locator('a[href^="/work/"]').first();
    await firstProject.click();
    await page.waitForLoadState("networkidle");

    // Click on an image to open lightbox
    const galleryImage = page.locator("img[alt]").first();
    await galleryImage.click();

    // Wait for lightbox to open
    await page.waitForTimeout(500);

    // Check if close button is focusable
    const closeButton = page.getByRole("button", { name: /Cerrar/i });
    await closeButton.focus();
    await expect(closeButton).toBeFocused();

    // Test arrow keys for navigation
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(300);

    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(300);

    // Close with Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
  });

  test("Film strip buttons should be keyboard accessible", async ({ page }) => {
    // Navigate to a project that has a film strip
    await page.goto("/work");
    await page.waitForLoadState("networkidle");

    const firstProject = page.locator('a[href^="/work/"]').first();
    await firstProject.click();
    await page.waitForLoadState("networkidle");

    // Check if film strip exists
    const filmStrip = page.locator('[aria-label*="secuencia"]').first();
    if ((await filmStrip.count()) > 0) {
      // Focus on film strip container
      await filmStrip.focus();

      // Test arrow key navigation
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(300);

      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(300);
    }
  });

  test("Before/After handle should be keyboard accessible", async ({
    page,
  }) => {
    // Navigate to a project
    await page.goto("/work");
    await page.waitForLoadState("networkidle");

    const firstProject = page.locator('a[href^="/work/"]').first();
    await firstProject.click();
    await page.waitForLoadState("networkidle");

    // Check if before/after slider exists
    const slider = page.locator('[role="slider"]').first();
    if ((await slider.count()) > 0) {
      await slider.focus();
      await expect(slider).toBeFocused();

      // Test arrow key navigation
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(200);

      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(200);

      // Test Home and End keys
      await page.keyboard.press("Home");
      await page.waitForTimeout(200);

      await page.keyboard.press("End");
      await page.waitForTimeout(200);
    }
  });

  test("Navigation menu should be keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Tab through navigation
    await page.keyboard.press("Tab");

    const workLink = page.getByRole("link", { name: "Work" });
    await workLink.focus();
    await expect(workLink).toBeFocused();

    const aboutLink = page.getByRole("link", { name: "About" });
    await aboutLink.focus();
    await expect(aboutLink).toBeFocused();

    const contactLink = page.getByRole("link", { name: "Contact" });
    await contactLink.focus();
    await expect(contactLink).toBeFocused();
  });
});

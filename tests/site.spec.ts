import { expect, test } from "@playwright/test";

test("home carousel opens event details with the current event information", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const carousel = page.getByRole("region", { name: "Featured events" });
  const fashionCard = carousel.getByRole("button", {
    name: "Open Mr. & Ms. Spectra details",
  });
  await expect(fashionCard).toBeVisible();
  await fashionCard.click();

  const details = page.getByRole("dialog");
  await expect(details.getByRole("heading", { name: "Mr. & Ms. Spectra" })).toBeVisible();
  await expect(details.getByText("Participants must bring their own dresses.")).toBeVisible();
  await expect(details.getByText("Hair and makeup will be provided.")).toBeVisible();
  await expect(details.getByText(/WhatsApp group linked in the Google Form/)).toBeVisible();
  await expect(details.getByText("Registration fee: ₹100")).toBeVisible();
  await expect(details.getByRole("link", { name: "Register for Mr. & Ms. Spectra" }))
    .toHaveAttribute("href", "https://forms.gle/CKgrkWueSndfMiXt7");
  await page.keyboard.press("Escape");
  await expect(details).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("events page shows the two-day schedule, searchable cards, fees, and registration links", async ({ page }) => {
  await page.goto("/events");
  await expect(page.getByRole("heading", { name: "Festival schedule" })).toBeVisible();
  await expect(page.getByText("Voice of Spectra", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Prize Distribution", { exact: true })).toBeVisible();

  await page.getByRole("searchbox", { name: "Search events" }).fill("Salsa Night");
  await expect(page.getByRole("status")).toContainText("1 event");
  await expect(page.getByRole("heading", { name: "Salsa Night", exact: true })).toBeVisible();
  await expect(page.getByText("Fee · ₹150 for two people")).toBeVisible();
  await expect(page.getByRole("link", { name: "Register for Salsa Night" }))
    .toHaveAttribute("href", "https://forms.gle/QvSuxTca5ZnZmccH8");
  await page.goto("/events/salsa-night");
  await expect(page.getByText(/partners can be any gender combination/)).toBeVisible();

  await page.goto("/events");
  await page.getByRole("searchbox", { name: "Search events" }).fill("HackerWrath");
  await expect(page.getByRole("link", { name: "Register for HackerWrath 3.0" }))
    .toHaveAttribute("href", "https://unstop.com/hackathons/hackerwrath-30-guru-nanak-dev-university-gndu-amritsar-1764531");
});

test("navigation and event pages load directly without horizontal overflow", async ({ page }) => {
  const routes = [
    "/",
    "/events",
    "/about",
    "/contact",
    "/events/dance-arena",
    "/events/hackerwrath-3",
    "/events/mr-and-ms-spectra",
    "/events/salsa-night",
    "/events/spectra-got-latent",
    "/events/voice-of-spectra",
  ];
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `horizontal overflow at ${route}`,
    ).toBe(true);
  }

  const missing = await page.goto("/events/not-an-event");
  expect(missing?.status()).toBe(404);
});

test("mobile event details remain scrollable and the menu exposes valid routes", async ({ page, isMobile }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation.getByRole("link", { name: /Events/ })).toBeVisible();
  await navigation.getByRole("link", { name: /Events/ }).click();
  await expect(page).toHaveURL(/\/events$/);

  await page.goto("/");
  await page.getByRole("button", { name: "Open Mr. & Ms. Spectra details" }).click({ force: true });
  const details = page.getByRole("dialog");
  await expect(details.getByRole("heading", { name: "Mr. & Ms. Spectra" })).toBeVisible();
  const scrollArea = details.locator(".overflow-y-auto").first();
  if (isMobile) {
    const dimensions = await scrollArea.evaluate((node) => ({
      client: node.clientHeight,
      scroll: node.scrollHeight,
    }));
    expect(dimensions.scroll).toBeGreaterThan(dimensions.client);
  }
  await expect(details.getByRole("link", { name: "Register for Mr. & Ms. Spectra" })).toBeVisible();
});

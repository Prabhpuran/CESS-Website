import { expect, test } from "@playwright/test";

test("featured events change with controls and open details without leaving home", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Featured events" });
  await expect(
    carousel.getByText("Featured event: Fashion Show", { exact: true }),
  ).toHaveText("Featured event: Fashion Show");
  await carousel
    .getByRole("button", { name: "Next event", exact: true })
    .click();
  await expect(
    carousel.getByText("Featured event: Music", { exact: true }),
  ).toHaveText("Featured event: Music");
  await carousel
    .getByRole("button", { name: "Show Hackathon", exact: true })
    .click();
  await expect(
    carousel.getByText("Featured event: Hackathon", { exact: true }),
  ).toHaveText("Featured event: Hackathon");
  await carousel
    .getByRole("button", { name: "Open Hackathon details", exact: true })
    .click();
  const details = page.getByRole("dialog");
  await expect(details.getByRole("heading", { name: "Hackathon" })).toBeVisible();
  await expect(details.getByText(/Build an original solution/)).toBeVisible();
  await expect(page).toHaveURL("/");
  await page.keyboard.press("Escape");
  await expect(details).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("menu, category filters, search, and empty state work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("navigation", { name: "Menu navigation" })
    .getByRole("link", { name: /Events/ })
    .click();
  await expect(page).toHaveURL(/\/events$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Technology", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("1 event");
  await expect(
    page.getByRole("heading", { name: "Hackathon", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Search events" })
    .fill("no such event");
  await expect(
    page.getByRole("heading", { name: "No events found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all events" }).click();
  await expect(page.getByRole("status")).toContainText("7 events");
});

test("registration explains the missing form and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page
    .getByRole("button", { name: "Register now", exact: true })
    .first();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "You’re early. The good kind." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("gallery opens and navigates its lightbox", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: /The Spectra universe/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "The Spectra universe" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Next image" }).click();
  await expect(
    dialog.getByRole("heading", { name: "Fashion Show" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(
    dialog.getByRole("heading", { name: "The Spectra universe" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /The Spectra universe/ }),
  ).toBeFocused();
});

test("carousel supports dragging and touch swiping", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const card = page.getByRole("button", {
    name: "Open Fashion Show details",
    exact: true,
  });
  await card.scrollIntoViewIfNeeded();
  const box = (await card.boundingBox())!;
  const x = box.x + box.width * 0.8;
  const y = box.y + box.height * 0.5;
  if (isMobile) {
    const session = await page.context().newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let step = 1; step <= 12; step++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x - step * 15, y }],
      });
    }
    await session.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await session.detach();
  } else {
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 220, y, { steps: 20 });
    await page.mouse.up();
  }
  await expect(
    page.getByText("Featured event: Music", { exact: true }),
  ).toHaveText("Featured event: Music");
  await expect(page).toHaveURL("/");
});

test("pages load directly without horizontal overflow; unknown events return 404", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/events",
    "/about",
    "/gallery",
    "/contact",
    "/events/bgmi-tournament",
    "/events/hackathon",
    "/events/fashion-show",
    "/events/music",
    "/events/dance-arena",
    "/events/film-and-frame",
    "/events/open-mic",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `overflow at ${route}`).toBe(false);
  }
  const missing = await page.goto("/events/not-an-event");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /This page hasn’t/ }),
  ).toBeVisible();
});

test("home adapts to narrow screens and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(
      page.getByRole("button", { name: "Open navigation menu" }),
    ).toBeVisible();
    const next = page.getByRole("button", { name: "Next event", exact: true });
    await next.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByText("Featured event: Music", { exact: true }),
    ).toHaveText("Featured event: Music");
  }
});

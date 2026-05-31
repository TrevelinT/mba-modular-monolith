import { test } from "@playwright/test";

test("seed", async ({ page }) => {
	await page.goto("http://localhost:5173/");
	await page
		.getByRole("heading", {
			name: "Nintendo Switch 2 - Bundle Mario Kart World",
		})
		.waitFor();
});

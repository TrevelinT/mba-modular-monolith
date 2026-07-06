module.exports = async (browser, context) => {
	const page = await browser.newPage();
	await page.goto(context.url, { waitUntil: "networkidle0", timeout: 30000 });

	// Wait until product + buy-box skeletons are gone
	await page.waitForFunction(
		() =>
			!document.querySelector('[aria-label="Loading product details"]') &&
			!document.querySelector('[aria-label="Loading buy box offer"]'),
		{ timeout: 15000 },
	);

	// Same loaded-state signal as Playwright E2E
	await page.waitForFunction(
		() =>
			[...document.querySelectorAll("h1")].some((el) =>
				el.textContent?.includes("Nintendo Switch 2 - Bundle Mario Kart World"),
			),
		{ timeout: 15000 },
	);

	await page.close();
};

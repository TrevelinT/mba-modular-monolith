import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	expect: {
		toHaveScreenshot: {
			animations: "disabled",
			maxDiffPixelRatio: 0.01,
		},
	},
	use: {
		baseURL: "http://localhost:5173",
		viewport: { width: 1280, height: 720 },
		deviceScaleFactor: 1,
		screenshot: "only-on-failure",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
			grepInvert: /@visual/,
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
			grepInvert: /@visual/,
		},
	],
	webServer: {
		command: process.env.CI ? "npm run preview" : "npm run dev",
		url: "http://localhost:5173",
		reuseExistingServer: !process.env.CI,
	},
});

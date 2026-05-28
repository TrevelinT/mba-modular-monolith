import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: [path.join(dirname, "vitest.setup.ts")],
		include: ["**/*.{test,spec}.{ts,tsx}"],
		exclude: ["**/node_modules/**", "**/dist/**"],
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["json", "text"],
			reportsDirectory: "./coverage",
		},
	},
});

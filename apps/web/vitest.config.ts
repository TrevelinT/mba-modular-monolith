import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vitest/config";
import rootConfig from "../../vitest.config";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(dirname, "../../packages");

export default mergeConfig(rootConfig, {
	esbuild: {
		jsx: "automatic",
	},
	resolve: {
		alias: {
			"@repo/cart": path.join(packagesDir, "cart/src/index.ts"),
			"@repo/buy-box": path.join(packagesDir, "buy-box/src/index.ts"),
			"@repo/product": path.join(packagesDir, "product/src/index.ts"),
		},
	},
});

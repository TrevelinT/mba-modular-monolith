import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const workspaces = [
	"apps/web",
	"packages/cart",
	"packages/buy-box",
	"packages/product",
];

const rawDir = "coverage/raw";
const mergedDir = "coverage/merged";

rmSync(rawDir, { recursive: true, force: true });
mkdirSync(rawDir, { recursive: true });

for (const workspace of workspaces) {
	const source = path.join(workspace, "coverage/coverage-final.json");
	if (!existsSync(source)) {
		throw new Error(
			`Missing coverage report: ${source}. Run "npm run test" first.`,
		);
	}

	const name = workspace.replace(/\//g, "-");
	cpSync(source, path.join(rawDir, `${name}.json`));
}

mkdirSync(mergedDir, { recursive: true });
execSync(`nyc merge ${rawDir} ${path.join(mergedDir, "coverage.json")}`, {
	stdio: "inherit",
});

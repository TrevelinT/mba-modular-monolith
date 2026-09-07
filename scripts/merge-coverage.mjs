import { execFileSync } from "node:child_process";
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

let copied = 0;

for (const workspace of workspaces) {
	const source = path.join(workspace, "coverage/coverage-final.json");
	if (!existsSync(source)) {
		console.warn(
			`Skipping missing coverage report: ${source}. Run tests in that workspace first.`,
		);
		continue;
	}

	const name = workspace.replace(/\//g, "-");
	cpSync(source, path.join(rawDir, `${name}.json`));
	copied += 1;
}

if (copied === 0) {
	console.warn("No package coverage reports found; skipping merge.");
	process.exit(0);
}

const nycBin = path.join(process.cwd(), "node_modules/nyc/bin/nyc.js");

if (!existsSync(nycBin)) {
	console.error(`nyc not found at ${nycBin}. Install dependencies first.`);
	process.exit(1);
}

mkdirSync(mergedDir, { recursive: true });
execFileSync(
	process.execPath,
	[nycBin, "merge", rawDir, path.join(mergedDir, "coverage.json")],
	{
		stdio: "inherit",
	},
);

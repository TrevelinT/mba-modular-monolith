import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

function criticalPathPreloadHints(): Plugin {
	return {
		name: "critical-path-preload-hints",
		apply: "build",
		transformIndexHtml: {
			order: "post",
			handler(html) {
				const scriptMatch = html.match(
					/<script type="module" crossorigin src="([^"]+)"><\/script>/,
				);
				const stylesheetMatch = html.match(
					/<link rel="stylesheet" crossorigin href="([^"]+)">/,
				);

				let nextHtml = html;

				if (scriptMatch) {
					const modulePreload = `<link rel="modulepreload" crossorigin href="${scriptMatch[1]}">`;
					nextHtml = nextHtml.replace(
						scriptMatch[0],
						`${modulePreload}\n  ${scriptMatch[0]}`,
					);
				}

				if (stylesheetMatch) {
					const stylesheetHref = stylesheetMatch[1];
					const asyncStylesheet = `<link rel="preload" as="style" crossorigin href="${stylesheetHref}" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" crossorigin href="${stylesheetHref}"></noscript>`;
					nextHtml = nextHtml.replace(stylesheetMatch[0], asyncStylesheet);
				}

				return nextHtml;
			},
		},
	};
}

export default defineConfig({
	plugins: [react(), tailwindcss(), criticalPathPreloadHints()],
});

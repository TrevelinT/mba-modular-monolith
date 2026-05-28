import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
	it("renders footer branding", () => {
		render(<App />);
		expect(screen.getByText("Game Store")).toBeInTheDocument();
	});
});

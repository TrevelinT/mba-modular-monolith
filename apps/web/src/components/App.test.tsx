import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders footer branding", () => {
		render(<App />);
		expect(screen.getByText("Game Store")).toBeInTheDocument();
	});

	it("adds item to cart when add to cart is clicked", () => {
		render(<App />);

		expect(
			screen.getByRole("button", { name: "Shopping cart, empty" }),
		).toBeInTheDocument();

		fireEvent.click(
			screen.getByRole("button", { name: "Adicionar ao carrinho" }),
		);

		expect(
			screen.getByRole("button", { name: "Shopping cart, 1 item" }),
		).toBeInTheDocument();
	});
});

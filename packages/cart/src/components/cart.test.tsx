import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Cart } from "./cart";

describe("Cart", () => {
	it("renders the cart heading", () => {
		render(<Cart />);
		expect(screen.getByText("Your Cart")).toBeInTheDocument();
	});
});

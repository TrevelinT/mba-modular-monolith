import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Product } from "./product";

describe("Product", () => {
	it("renders the product title", () => {
		render(<Product />);
		expect(
			screen.getByText('Nintendo Switch 2 - 8" OLED Edition'),
		).toBeInTheDocument();
	});
});

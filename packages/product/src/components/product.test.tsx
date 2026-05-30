import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProductPage } from "../api/product";
import { Product } from "../index";

describe("Product", () => {
	it("renders API-driven title, badge, and description", () => {
		const page = getProductPage();
		render(<Product />);

		expect(screen.getByText(page.title)).toBeInTheDocument();
		expect(screen.getByText(page.badge as string)).toBeInTheDocument();
		expect(screen.getByText(page.description)).toBeInTheDocument();
		expect(
			screen.getByText(`(${page.reviews.count.toLocaleString()} reviews)`),
		).toBeInTheDocument();
	});
});

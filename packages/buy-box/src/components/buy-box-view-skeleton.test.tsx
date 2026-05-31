import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatPrice } from "../api/format-price";
import { BuyBoxViewSkeleton } from "./buy-box-view-skeleton";

describe("BuyBoxViewSkeleton", () => {
	it("renders a loading status region without offer price text", () => {
		render(<BuyBoxViewSkeleton />);

		expect(
			screen.getByRole("status", { name: /loading buy box offer/i }),
		).toBeInTheDocument();
		expect(
			screen.queryByText(formatPrice(4099.99), { exact: false }),
		).not.toBeInTheDocument();
	});
});

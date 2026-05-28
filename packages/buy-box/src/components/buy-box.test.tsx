import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BuyBox } from "./buy-box";

describe("BuyBox", () => {
	it("renders the pre-order button", () => {
		render(<BuyBox />);
		expect(screen.getByText("Pre-order Now")).toBeInTheDocument();
	});
});

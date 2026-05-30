import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CART_ADD_ITEM_EVENT } from "../api/cart-events";
import { OFFER_PRODUCT_ID } from "../api/offer";
import { BuyBoxContainer } from "./buy-box-container";

describe("BuyBox", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the pre-order button", () => {
		render(<BuyBoxContainer />);
		expect(screen.getByText("Pre-order Now")).toBeInTheDocument();
	});

	it("increases and decreases quantity", () => {
		render(<BuyBoxContainer />);

		expect(screen.getByRole("status")).toHaveTextContent("1");

		fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
		expect(screen.getByRole("status")).toHaveTextContent("2");

		fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("does not decrease quantity below 1", () => {
		render(<BuyBoxContainer />);

		fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("publishes add-to-cart with OFFER_PRODUCT_ID and quantity on pre-order", () => {
		const handler = vi.fn();
		function onAdd(event: Event) {
			handler((event as CustomEvent).detail);
		}
		document.addEventListener(CART_ADD_ITEM_EVENT, onAdd);

		render(<BuyBoxContainer />);
		fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
		fireEvent.click(screen.getByText("Pre-order Now"));

		expect(handler).toHaveBeenCalledWith({
			productId: OFFER_PRODUCT_ID,
			quantity: 2,
		});

		document.removeEventListener(CART_ADD_ITEM_EVENT, onAdd);
	});
});

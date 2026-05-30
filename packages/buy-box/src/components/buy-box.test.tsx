import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CART_ADD_ITEM_EVENT } from "../api/cart-events";
import { OFFER_PRODUCT_ID } from "../api/offer";
import { publishAddToCart } from "../api/publish-add-to-cart";
import { BuyBox } from "./buy-box";

describe("publishAddToCart", () => {
	it("dispatches cart:add-item on document with detail", () => {
		const handler = vi.fn();
		function onAdd(event: Event) {
			handler((event as CustomEvent).detail);
		}
		document.addEventListener(CART_ADD_ITEM_EVENT, onAdd);

		publishAddToCart({ productId: OFFER_PRODUCT_ID, quantity: 3 });

		expect(handler).toHaveBeenCalledWith({
			productId: OFFER_PRODUCT_ID,
			quantity: 3,
		});

		document.removeEventListener(CART_ADD_ITEM_EVENT, onAdd);
	});
});

describe("BuyBox", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the pre-order button", () => {
		render(<BuyBox />);
		expect(screen.getByText("Pre-order Now")).toBeInTheDocument();
	});

	it("increases and decreases quantity", () => {
		render(<BuyBox />);

		expect(screen.getByRole("status")).toHaveTextContent("1");

		fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
		expect(screen.getByRole("status")).toHaveTextContent("2");

		fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("does not decrease quantity below 1", () => {
		render(<BuyBox />);

		fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("publishes add-to-cart with OFFER_PRODUCT_ID and quantity on pre-order", () => {
		const handler = vi.fn();
		function onAdd(event: Event) {
			handler((event as CustomEvent).detail);
		}
		document.addEventListener(CART_ADD_ITEM_EVENT, onAdd);

		render(<BuyBox />);
		fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
		fireEvent.click(screen.getByText("Pre-order Now"));

		expect(handler).toHaveBeenCalledWith({
			productId: OFFER_PRODUCT_ID,
			quantity: 2,
		});

		document.removeEventListener(CART_ADD_ITEM_EVENT, onAdd);
	});
});

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CART_ADD_ITEM_EVENT } from "../api/cart-events";
import { getOffer, OFFER_PRODUCT_ID } from "../api/offer";
import { BuyBoxContainer } from "./buy-box-container";

describe("BuyBox", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the add to cart button", async () => {
		render(<BuyBoxContainer />);
		expect(
			await screen.findByText("Adicionar ao carrinho"),
		).toBeInTheDocument();
	});

	it("increases and decreases quantity", async () => {
		render(<BuyBoxContainer />);

		await screen.findByText("Adicionar ao carrinho");
		expect(screen.getByRole("status")).toHaveTextContent("1");

		fireEvent.click(
			screen.getByRole("button", { name: "Aumentar quantidade" }),
		);
		expect(screen.getByRole("status")).toHaveTextContent("2");

		fireEvent.click(
			screen.getByRole("button", { name: "Diminuir quantidade" }),
		);
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("does not decrease quantity below 1", async () => {
		render(<BuyBoxContainer />);

		await screen.findByText("Adicionar ao carrinho");

		fireEvent.click(
			screen.getByRole("button", { name: "Diminuir quantidade" }),
		);
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("publishes add-to-cart with OFFER_PRODUCT_ID and quantity on add to cart", async () => {
		const handler = vi.fn();
		function onAdd(event: Event) {
			handler((event as CustomEvent).detail);
		}
		document.addEventListener(CART_ADD_ITEM_EVENT, onAdd);

		render(<BuyBoxContainer />);
		await screen.findByText("Adicionar ao carrinho");
		fireEvent.click(
			screen.getByRole("button", { name: "Aumentar quantidade" }),
		);
		fireEvent.click(screen.getByText("Adicionar ao carrinho"));

		expect(handler).toHaveBeenCalledWith({
			productId: OFFER_PRODUCT_ID,
			quantity: 2,
		});

		document.removeEventListener(CART_ADD_ITEM_EVENT, onAdd);
	});

	it("renders API-driven prices after loading", async () => {
		const offer = await getOffer({ latencyMs: 0 });
		render(<BuyBoxContainer />);

		expect(
			screen.getByRole("status", { name: /loading buy box offer/i }),
		).toBeInTheDocument();

		expect(
			await screen.findByText(
				(_, element) => element?.textContent === offer.installmentText,
			),
		).toBeInTheDocument();
	});
});

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { formatPrice } from "../api/format-price";
import type { Offer } from "../api/offer";
import { getOffer } from "../api/offer";
import { BuyBoxView } from "./buy-box-view";

let offer: Offer;

describe("BuyBoxView", () => {
	beforeAll(async () => {
		offer = await getOffer({ latencyMs: 0 });
	});

	afterEach(function cleanupDom() {
		cleanup();
	});

	it("renders prices and installment text from props", () => {
		render(
			<BuyBoxView
				installmentText={offer.installmentText}
				listPrice={offer.listPrice}
				onDecreaseQuantity={vi.fn()}
				onIncreaseQuantity={vi.fn()}
				onPreOrder={vi.fn()}
				quantity={1}
				salePrice={offer.salePrice}
			/>,
		);

		expect(
			screen.getByText(
				(_, element) => element?.textContent === formatPrice(offer.salePrice),
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				(_, element) => element?.textContent === formatPrice(offer.listPrice),
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				(_, element) => element?.textContent === offer.installmentText,
			),
		).toBeInTheDocument();
		expect(screen.getByRole("status")).toHaveTextContent("1");
	});

	it("calls onIncreaseQuantity when increase button is clicked", () => {
		const onIncreaseQuantity = vi.fn();
		render(
			<BuyBoxView
				installmentText={offer.installmentText}
				listPrice={offer.listPrice}
				onDecreaseQuantity={vi.fn()}
				onIncreaseQuantity={onIncreaseQuantity}
				onPreOrder={vi.fn()}
				quantity={1}
				salePrice={offer.salePrice}
			/>,
		);

		fireEvent.click(
			screen.getByRole("button", { name: "Aumentar quantidade" }),
		);
		expect(onIncreaseQuantity).toHaveBeenCalledOnce();
	});

	it("calls onDecreaseQuantity when decrease button is clicked", () => {
		const onDecreaseQuantity = vi.fn();
		render(
			<BuyBoxView
				installmentText={offer.installmentText}
				listPrice={offer.listPrice}
				onDecreaseQuantity={onDecreaseQuantity}
				onIncreaseQuantity={vi.fn()}
				onPreOrder={vi.fn()}
				quantity={2}
				salePrice={offer.salePrice}
			/>,
		);

		fireEvent.click(
			screen.getByRole("button", { name: "Diminuir quantidade" }),
		);
		expect(onDecreaseQuantity).toHaveBeenCalledOnce();
	});

	it("calls onPreOrder when add to cart button is clicked", () => {
		const onPreOrder = vi.fn();
		render(
			<BuyBoxView
				installmentText={offer.installmentText}
				listPrice={offer.listPrice}
				onDecreaseQuantity={vi.fn()}
				onIncreaseQuantity={vi.fn()}
				onPreOrder={onPreOrder}
				quantity={1}
				salePrice={offer.salePrice}
			/>,
		);

		fireEvent.click(screen.getByText("Adicionar ao carrinho"));
		expect(onPreOrder).toHaveBeenCalledOnce();
	});
});

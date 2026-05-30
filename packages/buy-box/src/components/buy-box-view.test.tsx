import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getOffer } from "../api/offer";
import { BuyBoxView } from "./buy-box-view";

const offer = getOffer();

describe("BuyBoxView", () => {
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

		expect(screen.getByText("$499.99")).toBeInTheDocument();
		expect(screen.getByText("$549.99")).toBeInTheDocument();
		expect(screen.getByText(offer.installmentText)).toBeInTheDocument();
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

		fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
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

		fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
		expect(onDecreaseQuantity).toHaveBeenCalledOnce();
	});

	it("calls onPreOrder when pre-order button is clicked", () => {
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

		fireEvent.click(screen.getByText("Pre-order Now"));
		expect(onPreOrder).toHaveBeenCalledOnce();
	});
});

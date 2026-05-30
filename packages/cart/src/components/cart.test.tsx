import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CART_ADD_ITEM_EVENT } from "../api/cart-events";
import { resetCartStore } from "../api/cart-store";
import { Cart } from "./cart";

function createMatchMediaMock(initialCanHover: boolean) {
	let matches = initialCanHover;
	const listeners = new Set<(event: MediaQueryListEvent) => void>();

	window.matchMedia = vi.fn().mockImplementation(function mockMediaQuery(
		query: string,
	) {
		return {
			get matches() {
				return matches;
			},
			media: query,
			addEventListener(
				_type: string,
				handler: (event: MediaQueryListEvent) => void,
			) {
				listeners.add(handler);
			},
			removeEventListener(
				_type: string,
				handler: (event: MediaQueryListEvent) => void,
			) {
				listeners.delete(handler);
			},
		};
	});

	function changeDeviceSize(canHover: boolean) {
		matches = canHover;
		const event = { matches: canHover } as MediaQueryListEvent;

		for (const listener of listeners) {
			listener(event);
		}
	}

	return { changeDeviceSize };
}

function mockMatchMedia(canHover: boolean) {
	createMatchMediaMock(canHover);
}

describe("Cart", () => {
	afterEach(() => {
		cleanup();
		resetCartStore();
		vi.restoreAllMocks();
	});

	it("renders the cart heading", () => {
		mockMatchMedia(false);
		render(<Cart />);
		expect(screen.getByText("Your Cart")).toBeInTheDocument();
	});

	it("starts with the panel closed", () => {
		mockMatchMedia(false);
		render(<Cart />);

		expect(
			screen.getByRole("button", { name: "Shopping cart, empty" }),
		).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByLabelText("Cart preview")).toHaveAttribute(
			"aria-hidden",
			"true",
		);
	});

	it("updates badge and line items when add-to-cart event is published", () => {
		mockMatchMedia(false);
		render(<Cart />);

		act(function dispatchAddToCart() {
			document.dispatchEvent(
				new CustomEvent(CART_ADD_ITEM_EVENT, {
					detail: { productId: "nintendo-switch-2", quantity: 2 },
				}),
			);
		});

		expect(
			screen.getByRole("button", { name: "Shopping cart, 2 items" }),
		).toBeInTheDocument();
		expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
		expect(screen.getAllByText("$999.98")).toHaveLength(2);
	});

	it("toggles the panel on click in touch mode", () => {
		mockMatchMedia(false);
		render(<Cart />);

		const cartButton = screen.getByRole("button", {
			name: "Shopping cart, empty",
		});
		const panel = screen.getByLabelText("Cart preview");

		fireEvent.click(cartButton);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");

		fireEvent.click(cartButton);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");
	});

	it("closes the panel when clicking outside in touch mode", () => {
		mockMatchMedia(false);
		render(<Cart />);

		const cartButton = screen.getByRole("button", {
			name: "Shopping cart, empty",
		});
		const panel = screen.getByLabelText("Cart preview");

		fireEvent.click(cartButton);
		expect(panel).toHaveAttribute("aria-hidden", "false");

		fireEvent.click(document.body);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");
	});

	it("opens and closes the panel on hover in desktop mode", () => {
		mockMatchMedia(true);
		render(<Cart />);

		const cartButton = screen.getByRole("button", {
			name: "Shopping cart, empty",
		});
		const panel = screen.getByLabelText("Cart preview");
		const container = cartButton.parentElement;

		expect(container).not.toBeNull();

		fireEvent.mouseEnter(container as HTMLElement);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");

		fireEvent.mouseLeave(container as HTMLElement);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");
	});

	it("keeps the panel open when hovering from the button to the panel", () => {
		mockMatchMedia(true);
		render(<Cart />);

		const cartButton = screen.getByRole("button", {
			name: "Shopping cart, empty",
		});
		const panel = screen.getByLabelText("Cart preview");

		fireEvent.mouseEnter(cartButton);
		fireEvent.mouseEnter(panel);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");
	});

	it("switches interaction mode when device orientation changes the hover media query", () => {
		const { changeDeviceSize } = createMatchMediaMock(true);
		render(<Cart />);

		const cartButton = screen.getByRole("button", {
			name: "Shopping cart, empty",
		});
		const panel = screen.getByLabelText("Cart preview");
		const container = cartButton.parentElement as HTMLElement;

		fireEvent.mouseEnter(container);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");

		act(function rotateToTouchDevice() {
			changeDeviceSize(false);
		});

		fireEvent.click(cartButton);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");

		fireEvent.click(cartButton);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");

		fireEvent.click(document.body);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");

		act(function rotateToDesktopDevice() {
			changeDeviceSize(true);
		});

		fireEvent.click(cartButton);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");

		fireEvent.mouseEnter(container);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");

		fireEvent.mouseEnter(cartButton);
		fireEvent.mouseEnter(panel);
		expect(cartButton).toHaveAttribute("aria-expanded", "true");
		expect(panel).toHaveAttribute("aria-hidden", "false");

		fireEvent.mouseLeave(container);
		expect(cartButton).toHaveAttribute("aria-expanded", "false");
		expect(panel).toHaveAttribute("aria-hidden", "true");
	});
});

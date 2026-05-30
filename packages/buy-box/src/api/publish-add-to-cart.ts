import { type AddToCartCommand, CART_ADD_ITEM_EVENT } from "./cart-events";

export function publishAddToCart(command: AddToCartCommand): void {
	document.dispatchEvent(
		new CustomEvent(CART_ADD_ITEM_EVENT, { detail: command, bubbles: true }),
	);
}

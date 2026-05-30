import { type AddToCartCommand, CART_ADD_ITEM_EVENT } from "./cart-events";

const domListeners = new WeakMap<
	(command: AddToCartCommand) => void,
	(event: Event) => void
>();

export function subscribeToCart(
	handler: (command: AddToCartCommand) => void,
): void {
	function onAdd(event: Event) {
		const detail = (event as CustomEvent<AddToCartCommand>).detail;
		if (detail?.productId && detail.quantity > 0) {
			handler(detail);
		}
	}
	domListeners.set(handler, onAdd);
	document.addEventListener(CART_ADD_ITEM_EVENT, onAdd);
}

export function unsubscribeFromCart(
	handler: (command: AddToCartCommand) => void,
): void {
	const onAdd = domListeners.get(handler);
	if (onAdd) {
		document.removeEventListener(CART_ADD_ITEM_EVENT, onAdd);
		domListeners.delete(handler);
	}
}

import type { AddToCartCommand } from "./cart-events";
import { subscribeToCart, unsubscribeFromCart } from "./cart-pubsub";
import { addToCart, type CartLineItem } from "./catalog";

let items: CartLineItem[] = [];

export function getCartItems(): CartLineItem[] {
	return items;
}

export function resetCartStore(): void {
	items = [];
}

export function subscribeToCartStore(onStoreChange: () => void): () => void {
	function onCommand(command: AddToCartCommand) {
		items = addToCart(items, command);
		onStoreChange();
	}
	subscribeToCart(onCommand);
	return () => {
		unsubscribeFromCart(onCommand);
	};
}

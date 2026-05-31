import type { AddToCartCommand } from "./cart-events";
import { subscribeToCart, unsubscribeFromCart } from "./cart-pubsub";
import { addToCart, type CartLineItem, getCatalogItem } from "./catalog";

let items: CartLineItem[] = [];
let mutationChain = Promise.resolve();

export function getCartItems(): CartLineItem[] {
	return items;
}

export function resetCartStore(): void {
	items = [];
	mutationChain = Promise.resolve();
}

export function subscribeToCartStore(onStoreChange: () => void): () => void {
	function onCommand(command: AddToCartCommand) {
		mutationChain = mutationChain.then(async function applyAddToCart() {
			const catalogItem = await getCatalogItem(command.productId);
			if (!catalogItem) {
				return;
			}
			items = addToCart(items, command, catalogItem);
			onStoreChange();
		});
	}
	subscribeToCart(onCommand);
	return () => {
		unsubscribeFromCart(onCommand);
	};
}

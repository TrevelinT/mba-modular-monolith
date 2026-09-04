import type { AddToCartCommand } from "./cart-events";
import { subscribeToCart, unsubscribeFromCart } from "./cart-pubsub";
import {
	addToCart,
	type CartLineItem,
	getCatalogItem,
	removeFromCart,
} from "./catalog";

let items: CartLineItem[] = [];
let mutationChain = Promise.resolve();
const storeListeners = new Set<() => void>();

function notifyStoreListeners(): void {
	for (const listener of storeListeners) {
		listener();
	}
}

export function getCartItems(): CartLineItem[] {
	return items;
}

export function resetCartStore(): void {
	items = [];
	mutationChain = Promise.resolve();
}

export function removeCartItem(productId: string): void {
	mutationChain = mutationChain.then(function applyRemoveFromCart() {
		const lineExists = items.some((item) => item.productId === productId);
		if (!lineExists) {
			return;
		}
		items = removeFromCart(items, productId);
		notifyStoreListeners();
	});
}

export function subscribeToCartStore(onStoreChange: () => void): () => void {
	storeListeners.add(onStoreChange);

	function onCommand(command: AddToCartCommand) {
		mutationChain = mutationChain.then(async function applyAddToCart() {
			const catalogItem = await getCatalogItem(command.productId);
			if (!catalogItem) {
				return;
			}
			items = addToCart(items, command, catalogItem);
			notifyStoreListeners();
		});
	}
	subscribeToCart(onCommand);
	return () => {
		unsubscribeFromCart(onCommand);
		storeListeners.delete(onStoreChange);
	};
}

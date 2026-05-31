import { afterEach, describe, expect, it, vi } from "vitest";
import { CART_ADD_ITEM_EVENT } from "../api/cart-events";
import { subscribeToCart, unsubscribeFromCart } from "../api/cart-pubsub";
import {
	getCartItems,
	resetCartStore,
	subscribeToCartStore,
} from "../api/cart-store";
import {
	addToCart,
	CATALOG_PRODUCT_ID,
	getCartSummary,
	getCatalogItem,
} from "../api/catalog";

describe("catalog", () => {
	it("returns a catalog item for CATALOG_PRODUCT_ID", () => {
		const item = getCatalogItem(CATALOG_PRODUCT_ID);
		expect(item).toBeDefined();
		expect(item?.unitPrice).toBe(4099.99);
	});

	it("addToCart merges lines by productId", () => {
		const first = addToCart([], {
			productId: CATALOG_PRODUCT_ID,
			quantity: 1,
		});
		const merged = addToCart(first, {
			productId: CATALOG_PRODUCT_ID,
			quantity: 2,
		});

		expect(merged).toHaveLength(1);
		expect(merged[0]?.quantity).toBe(3);
	});

	it("addToCart ignores unknown productId", () => {
		const items = addToCart([], {
			productId: "unknown-product",
			quantity: 1,
		});
		expect(items).toHaveLength(0);
	});

	it("getCartSummary totals quantity and subtotal", () => {
		const items = addToCart([], {
			productId: CATALOG_PRODUCT_ID,
			quantity: 2,
		});
		expect(getCartSummary(items)).toEqual({
			itemCount: 2,
			subtotal: 8199.98,
		});
	});
});

describe("cart pub/sub", () => {
	afterEach(() => {
		resetCartStore();
	});

	it("subscribeToCart receives document events", () => {
		const handler = vi.fn();
		subscribeToCart(handler);

		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: CATALOG_PRODUCT_ID, quantity: 1 },
			}),
		);

		expect(handler).toHaveBeenCalledWith({
			productId: CATALOG_PRODUCT_ID,
			quantity: 1,
		});

		unsubscribeFromCart(handler);
	});

	it("unsubscribeFromCart stops receiving events", () => {
		const handler = vi.fn();
		subscribeToCart(handler);
		unsubscribeFromCart(handler);

		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: CATALOG_PRODUCT_ID, quantity: 1 },
			}),
		);

		expect(handler).not.toHaveBeenCalled();
	});

	it("ignores invalid event detail", () => {
		const handler = vi.fn();
		subscribeToCart(handler);

		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: "", quantity: 1 },
			}),
		);
		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: CATALOG_PRODUCT_ID, quantity: 0 },
			}),
		);

		expect(handler).not.toHaveBeenCalled();
		unsubscribeFromCart(handler);
	});
});

describe("cart store", () => {
	afterEach(() => {
		resetCartStore();
	});

	it("subscribeToCartStore updates getCartItems", () => {
		const onStoreChange = vi.fn();
		const unsubscribe = subscribeToCartStore(onStoreChange);

		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: CATALOG_PRODUCT_ID, quantity: 2 },
			}),
		);

		expect(getCartItems()).toHaveLength(1);
		expect(getCartItems()[0]?.quantity).toBe(2);
		expect(onStoreChange).toHaveBeenCalled();

		unsubscribe();
	});
});

import { waitFor } from "@testing-library/react";
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
	type CatalogItem,
	getCartSummary,
	getCatalogItem,
} from "../api/catalog";

const catalogItemFixture: CatalogItem = {
	name: "Nintendo Switch 2 - Bundle Mario Kart World",
	imageUrl:
		"https://cdn.awsli.com.br/600x450/2443/2443989/produto/366571198/63388ed8cf5558ee164d38ad715b2266-5oolcqzk74.jpg",
	unitPrice: 4099.99,
};

describe("catalog", () => {
	it("returns a catalog item for CATALOG_PRODUCT_ID", async () => {
		const item = await getCatalogItem(CATALOG_PRODUCT_ID, { latencyMs: 0 });
		expect(item).toBeDefined();
		expect(item?.unitPrice).toBe(4099.99);
	});

	it("returns undefined for unknown productId", async () => {
		const item = await getCatalogItem("unknown-product", { latencyMs: 0 });
		expect(item).toBeUndefined();
	});

	it("addToCart merges lines by productId", () => {
		const first = addToCart(
			[],
			{
				productId: CATALOG_PRODUCT_ID,
				quantity: 1,
			},
			catalogItemFixture,
		);
		const merged = addToCart(
			first,
			{
				productId: CATALOG_PRODUCT_ID,
				quantity: 2,
			},
			catalogItemFixture,
		);

		expect(merged).toHaveLength(1);
		expect(merged[0]?.quantity).toBe(3);
	});

	it("getCartSummary totals quantity and subtotal", () => {
		const items = addToCart(
			[],
			{
				productId: CATALOG_PRODUCT_ID,
				quantity: 2,
			},
			catalogItemFixture,
		);
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

	it("subscribeToCartStore updates getCartItems", async () => {
		const onStoreChange = vi.fn();
		const unsubscribe = subscribeToCartStore(onStoreChange);

		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: CATALOG_PRODUCT_ID, quantity: 2 },
			}),
		);

		await waitFor(() => {
			expect(getCartItems()).toHaveLength(1);
		});
		expect(getCartItems()[0]?.quantity).toBe(2);
		expect(onStoreChange).toHaveBeenCalled();

		unsubscribe();
	});

	it("ignores unknown productId", async () => {
		const onStoreChange = vi.fn();
		const unsubscribe = subscribeToCartStore(onStoreChange);

		document.dispatchEvent(
			new CustomEvent(CART_ADD_ITEM_EVENT, {
				detail: { productId: "unknown-product", quantity: 1 },
			}),
		);

		await waitFor(() => {
			expect(onStoreChange).not.toHaveBeenCalled();
		});
		expect(getCartItems()).toHaveLength(0);

		unsubscribe();
	});
});

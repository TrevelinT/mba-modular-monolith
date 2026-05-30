import { describe, expect, it, vi } from "vitest";
import { CART_ADD_ITEM_EVENT } from "./cart-events";
import { OFFER_PRODUCT_ID } from "./offer";
import { publishAddToCart } from "./publish-add-to-cart";

describe("publishAddToCart", () => {
	it("dispatches cart:add-item on document with detail", () => {
		const handler = vi.fn();
		function onAdd(event: Event) {
			handler((event as CustomEvent).detail);
		}
		document.addEventListener(CART_ADD_ITEM_EVENT, onAdd);

		publishAddToCart({ productId: OFFER_PRODUCT_ID, quantity: 3 });

		expect(handler).toHaveBeenCalledWith({
			productId: OFFER_PRODUCT_ID,
			quantity: 3,
		});

		document.removeEventListener(CART_ADD_ITEM_EVENT, onAdd);
	});
});

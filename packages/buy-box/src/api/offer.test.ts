import { describe, expect, it } from "vitest";
import { getOffer, OFFER_PRODUCT_ID } from "./offer";

describe("offer API", () => {
	it("exports OFFER_PRODUCT_ID as nintendo-switch-2", () => {
		expect(OFFER_PRODUCT_ID).toBe("nintendo-switch-2");
	});

	it("getOffer returns offer metadata", () => {
		const offer = getOffer();
		expect(offer.productId).toBe(OFFER_PRODUCT_ID);
		expect(offer.salePrice).toBe(499.99);
		expect(offer.listPrice).toBe(549.99);
		expect(offer.installmentText).toBe("ou 12x de $41.66 sem juros");
	});
});

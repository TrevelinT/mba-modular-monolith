import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";
import { getOffer, OFFER_PRODUCT_ID } from "./offer";

describe("offer API", () => {
	it("exports OFFER_PRODUCT_ID as nintendo-switch-2", () => {
		expect(OFFER_PRODUCT_ID).toBe("nintendo-switch-2");
	});

	it("getOffer returns offer metadata", async () => {
		const offer = await getOffer({ latencyMs: 0 });
		expect(offer.productId).toBe(OFFER_PRODUCT_ID);
		expect(offer.salePrice).toBe(4099.99);
		expect(offer.listPrice).toBe(4499.99);
		expect(offer.installmentText).toBe(
			`ou 10x de ${formatPrice(4099.99 / 10)} sem juros`,
		);
	});
});

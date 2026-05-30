import { describe, expect, it } from "vitest";
import { getProductPage, PRODUCT_ID } from "../api/product";

describe("product API", () => {
	it("exports PRODUCT_ID as nintendo-switch-2", () => {
		expect(PRODUCT_ID).toBe("nintendo-switch-2");
	});

	it("getProductPage returns product metadata", () => {
		const page = getProductPage();
		expect(page.id).toBe(PRODUCT_ID);
		expect(page.title).toContain("Nintendo Switch 2");
		expect(page.description.length).toBeGreaterThan(0);
		expect(page.mainImageUrl).toMatch(/^https:\/\//);
		expect(page.thumbnailImageUrls.length).toBeGreaterThan(0);
	});
});

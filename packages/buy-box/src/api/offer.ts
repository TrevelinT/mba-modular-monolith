export const OFFER_PRODUCT_ID = "nintendo-switch-2";

export function getOffer() {
	return {
		productId: OFFER_PRODUCT_ID,
		salePrice: 499.99,
		listPrice: 549.99,
		installmentText: "ou 12x de $41.66 sem juros",
	};
}

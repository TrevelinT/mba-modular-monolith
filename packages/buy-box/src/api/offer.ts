import { formatPrice } from "./format-price";

export const OFFER_PRODUCT_ID = "nintendo-switch-2";

const INSTALLMENT_COUNT = 10;

export interface Offer {
	productId: string;
	salePrice: number;
	listPrice: number;
	installmentText: string;
}

export function getOffer(): Offer {
	const salePrice = 4099.99;
	const listPrice = 4499.99;
	const installmentAmount = salePrice / INSTALLMENT_COUNT;

	return {
		productId: OFFER_PRODUCT_ID,
		salePrice,
		listPrice,
		installmentText: `ou ${INSTALLMENT_COUNT}x de ${formatPrice(installmentAmount)} sem juros`,
	};
}

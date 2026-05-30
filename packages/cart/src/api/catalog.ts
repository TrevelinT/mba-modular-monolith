import type { AddToCartCommand } from "./cart-events";

export const CATALOG_PRODUCT_ID = "nintendo-switch-2";

export interface CatalogItem {
	name: string;
	imageUrl: string;
	unitPrice: number;
}

export interface CartLineItem {
	productId: string;
	quantity: number;
	name: string;
	imageUrl: string;
	unitPrice: number;
}

const catalog: Record<string, CatalogItem> = {
	[CATALOG_PRODUCT_ID]: {
		name: 'Nintendo Switch 2 - 8" OLED',
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDQbHyeGMFNKPhxM_LwW1marbXI_827qzjF8NVgxO2k-WNFigFZg0sAT2r3nF3MW5i6KwztMUE-L146VtDjA3g5XwMW2cOA_00tLXl7Rr1RaW-_ayt96MtDz0-OZa4Vn0VppAUA69IRFkjhi-g-QRf9URKQZJ7k0Fia17FndBAhl0MRbTryaEksh1gBZQBe2FZMplv9Qin-C9KgBXFTkh7_hOQlYOGZdYQlnxQQKZjk8fKNkUsL0KPffiHQDt7iGuNYN55fPDAeKDgr",
		unitPrice: 499.99,
	},
};

export function getCatalogItem(productId: string): CatalogItem | undefined {
	return catalog[productId];
}

export function addToCart(
	items: CartLineItem[],
	command: AddToCartCommand,
): CartLineItem[] {
	const catalogItem = getCatalogItem(command.productId);
	if (!catalogItem) {
		return items;
	}

	const existingIndex = items.findIndex(
		(item) => item.productId === command.productId,
	);

	if (existingIndex >= 0) {
		const updated = [...items];
		const existing = updated[existingIndex];
		if (existing) {
			updated[existingIndex] = {
				...existing,
				quantity: existing.quantity + command.quantity,
			};
		}
		return updated;
	}

	return [
		...items,
		{
			productId: command.productId,
			quantity: command.quantity,
			name: catalogItem.name,
			imageUrl: catalogItem.imageUrl,
			unitPrice: catalogItem.unitPrice,
		},
	];
}

export function getCartSummary(items: CartLineItem[]): {
	itemCount: number;
	subtotal: number;
} {
	const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const subtotal = items.reduce(
		(sum, item) => sum + item.unitPrice * item.quantity,
		0,
	);

	return { itemCount, subtotal };
}

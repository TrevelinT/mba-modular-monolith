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
		name: "Nintendo Switch 2 - Bundle Mario Kart World",
		imageUrl:
			"https://cdn.awsli.com.br/600x450/2443/2443989/produto/366571198/63388ed8cf5558ee164d38ad715b2266-5oolcqzk74.jpg",
		unitPrice: 4099.99,
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

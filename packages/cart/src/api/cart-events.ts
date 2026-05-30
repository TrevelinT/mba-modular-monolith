export const CART_ADD_ITEM_EVENT = "cart:add-item";

export interface AddToCartCommand {
	productId: string;
	quantity: number;
}

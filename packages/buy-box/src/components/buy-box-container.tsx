import { useState } from "react";
import { getOffer, OFFER_PRODUCT_ID } from "../api/offer";
import { publishAddToCart } from "../api/publish-add-to-cart";
import { BuyBoxView } from "./buy-box-view";

function BuyBoxContainer() {
	const offer = getOffer();
	const [quantity, setQuantity] = useState(1);

	function handleDecreaseQuantity() {
		setQuantity((current) => Math.max(1, current - 1));
	}

	function handleIncreaseQuantity() {
		setQuantity((current) => current + 1);
	}

	function handlePreOrder() {
		publishAddToCart({ productId: OFFER_PRODUCT_ID, quantity });
	}

	return (
		<BuyBoxView
			installmentText={offer.installmentText}
			listPrice={offer.listPrice}
			onDecreaseQuantity={handleDecreaseQuantity}
			onIncreaseQuantity={handleIncreaseQuantity}
			onPreOrder={handlePreOrder}
			quantity={quantity}
			salePrice={offer.salePrice}
		/>
	);
}

export { BuyBoxContainer };

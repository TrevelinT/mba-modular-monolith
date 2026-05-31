import { useState } from "react";
import { OFFER_PRODUCT_ID } from "../api/offer";
import { publishAddToCart } from "../api/publish-add-to-cart";
import { BuyBoxView } from "./buy-box-view";
import { BuyBoxViewSkeleton } from "./buy-box-view-skeleton";
import { useOffer } from "./use-offer";

function BuyBoxContainer() {
	const { offer, isLoading } = useOffer();
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

	if (isLoading || offer === null) {
		return <BuyBoxViewSkeleton />;
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

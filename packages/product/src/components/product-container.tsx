import { getProductPage } from "../api/product";
import { ProductView } from "./product-view";

function ProductContainer() {
	const page = getProductPage();
	return (
		<ProductView
			title={page.title}
			badge={page.badge}
			description={page.description}
			reviews={page.reviews}
			photos={page.photos}
		/>
	);
}

export { ProductContainer };

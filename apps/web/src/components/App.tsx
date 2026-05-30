import { BuyBox } from "@repo/buy-box";
import { Product } from "@repo/product";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";
import { Footer } from "./Footer";
import { Header } from "./Header";

function App() {
	return (
		<div className="lg:min-h-dvh lg:flex lg:flex-col">
			<Header />
			<main className="pt-24 pb-xl max-w-max-width mx-auto px-margin-mobile md:px-gutter lg:flex-1">
				<Breadcrumb />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-xl">
					<Product />
					<BuyBox />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export { App };

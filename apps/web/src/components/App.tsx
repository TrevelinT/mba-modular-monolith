import { BuyBox } from "@repo/buy-box/components/buy-box";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Product } from "@repo/product/components/product";

function App() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-xl max-w-max-width mx-auto px-margin-mobile md:px-gutter">
        <Breadcrumb />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-xl">
          <Product />
          <BuyBox />
        </div>
      </main>
      <Footer />
    </>
  );
}

export { App };

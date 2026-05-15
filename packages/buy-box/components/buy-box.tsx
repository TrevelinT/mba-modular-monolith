interface BuyBoxProps {}

function BuyBox({}: BuyBoxProps) {
  return <div id="buy-box">
    <section className="buy-box__pricing">
    <p className="buy-box__price">R$ 4799,99</p>
    <p className="buy-box__price-installments">em até 12x de <span className="buy-box__price-installments-value">R$ 399,99</span> sem juros</p>
    </section>
    <section className="buy-box__shipping">
      <p className="buy-box__shipping-title">Frete grátis</p>
      <p className="buy-box__shipping-description">Frete grátis para compras acima de R$ 1000,00</p>
    </section>
    <form className="buy-box__quantity">
      <label htmlFor="quantity">Quantidade</label>
      <input type="number" id="quantity" min="1" max="5" value="1" />
    </form>
    <section className="buy-box__actions">
      <button className="buy-box__button-add-to-cart">Adicionar ao carrinho</button>
      <button className="buy-box__button-buy-now">Comprar agora</button>
    </section>
  </div>;
}

export { BuyBox };

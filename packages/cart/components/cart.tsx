function Cart() {
  return <div id="cart">
    <h2 className="text-2xl font-bold text-center text-blue-500">Carrinho</h2>
    <p>3 <span>produtos no carrinho</span></p>
    <section className="cart__items">
      <ul>
        <li>Produto 1</li>
        <li>Produto 2</li>
        <li>Produto 3</li>
      </ul>
    </section>
  </div>;
};

export { Cart };

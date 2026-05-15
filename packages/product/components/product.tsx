// interface ProductProps {
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

function Product() {
  return <div id="product">
    <img src="https://via.placeholder.com/150" alt="Product" />
    <ul>
      <li><img src="https://via.placeholder.com/50" alt="Product Image 1" /></li>
      <li><img src="https://via.placeholder.com/50" alt="Product Image 2" /></li>
      <li><img src="https://via.placeholder.com/50" alt="Product Image 3" /></li>
    </ul>
    <h2>Bundle Console Nintendo Switch 2 + Mario Kart World</h2>
    <p>Bundle Console Nintendo Switch 2 + Mario Kart World. Comece sua aventuras no Nintendo Switch 2 com este bundle que inclui um console e o download do jogo Mario Kart World completo, exclusivo para o Nintendo Switch 2.</p>
  </div>;
}

export { Product };

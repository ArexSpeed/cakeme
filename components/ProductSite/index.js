import React from 'react';
import CardItem from 'components/CardItem';
import { AddShoppingCart, ChatBubble, Visibility } from '@material-ui/icons';
//style ProductSite

const ProductSite = ({ product, bakeryProducts }) => {
  console.log(product, 'product');
  console.log(bakeryProducts, 'products');
  const ingriedients = product.ingredients.split(',');
  return (
    <section className="product">
      <div className="product__price">From {product.price}</div>
      <article className="product__top">
        <img
          src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
          alt=""
        />
        <div className="product__info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Ingridiens:</p>
          <ul>
            {ingriedients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </article>
      <article>
        <div className="productActions">
          <button>
            <AddShoppingCart />
            <span>Order this cake</span>
          </button>
          <button>
            <ChatBubble />
            <span>Send message</span>
          </button>
          <button>
            <Visibility />
            <span>Our Bakery</span>
          </button>
        </div>
        <p>Other products from {product.bakery[0]}</p>
        <section className="section">
          {bakeryProducts.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </section>
      </article>
    </section>
  );
};

export default ProductSite;

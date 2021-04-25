import React from 'react';
import CardItem from 'components/CardItem';
import { AddShoppingCart, ChatBubble, Visibility } from '@material-ui/icons';
//style ProductSite

const ProductSite = () => {
  return (
    <section className="product">
      <div className="product__price">From 30$</div>
      <article className="product__top">
        <img
          src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
          alt=""
        />
        <div className="product__info">
          <h2>Chocolate Cake</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, rerum. Officia ad
            aperiam ipsam quasi! Atque maxime, incidunt ipsa temporibus vero error enim eveniet
            voluptatibus voluptate dolorem est earum alias quos, perferendis provident repudiandae
            soluta molestiae voluptates, ex suscipit illo beatae dolores quod quas! Ad at a
            quibusdam illo suscipit.
          </p>
          <p>Ingridiens:</p>
          <ul>
            <li>Chocolate</li>
            <li>Sugar</li>
            <li>Milk</li>
            <li>Almonds</li>
            <li>Strawberry</li>
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
        <p>Other products from Our Bakery</p>
        <CardItem />
      </article>
    </section>
  );
};

export default ProductSite;

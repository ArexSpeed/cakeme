import React from 'react';
import CardItem from 'components/CardItem';
// eslint-disable-next-line prettier/prettier
import { ProductContainer, ProductPrice, ProductImg, ProductTop, Info, ActionsContainer, ActionBox } from './ProductStyles';
import { AddShoppingCart, ChatBubble, Visibility } from '@material-ui/icons';

const ProductSite = () => {
  return (
    <ProductContainer>
      <ProductPrice>From 30$</ProductPrice>
      <ProductTop>
        <ProductImg
          src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
          alt="Image"
        />
        <Info>
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
        </Info>
      </ProductTop>
      <div>
        <ActionsContainer>
          <ActionBox>
            <AddShoppingCart />
            <span>Order this cake</span>
          </ActionBox>
          <ActionBox>
            <ChatBubble />
            <span>Send message</span>
          </ActionBox>
          <ActionBox>
            <Visibility />
            <span>Our Bakery</span>
          </ActionBox>
        </ActionsContainer>
        <p>Other products from Our Bakery</p>
        <CardItem />
      </div>
    </ProductContainer>
  );
};

export default ProductSite;

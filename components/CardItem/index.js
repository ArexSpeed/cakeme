import Link from 'next/link';
import { Card, CardImg, CardTitle, CardInfo, CardActions, CardButton } from './CardStyles';
import { Favorite, AddShoppingCart, Visibility } from '@material-ui/icons';

const CardItem = ({ item }) => {
  return (
    <Card>
      <CardImg
        src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
        alt="Image"
      />
      <CardTitle>Choclate Forrest</CardTitle>
      <CardInfo>
        <h4>From 30$</h4>
        <h4>
          <Link href="/">Our Bakery</Link>
        </h4>
      </CardInfo>
      <CardActions>
        <CardButton>
          <Favorite />
        </CardButton>
        <CardButton>
          <Link href="/">
            <Visibility />
          </Link>
        </CardButton>
        <CardButton>
          <AddShoppingCart />
        </CardButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;

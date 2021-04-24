import Link from 'next/link';
import { Card, CardImg, CardTitle, CardInfo, CardActions, CardButton } from './CardStyles';
import { Favorite, AddShoppingCart, Visibility } from '@material-ui/icons';

const CardItem = ({ item }) => {
  console.log(item);
  return (
    <Card>
      <CardImg
        src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
        alt="Image"
      />
      <CardTitle>{item.name}</CardTitle>
      <CardInfo>
        <h4>From {item.price}$</h4>
        <h4>
          <Link href="/">{item.bakery}</Link>
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

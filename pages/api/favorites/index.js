import { addToFavorite } from 'services/favorites';
import { getProduct } from 'services/products/getProduct';

export default async (req, res) => {
  let product = await getProduct(req.body.product.id);

  switch (req.method) {
    case 'POST': {
      console.log('put fav in api');
      try {
        const payload = req.body;
        product = await addToFavorite(product.airtableId, product.id, payload.user.id);
        res.status(200).json({ status: 'updated', product });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }
    case 'DELETE': {
      console.log('delete in api');
      break;
    }
    // case 'DELETE': {
    //   try {
    //     const payload = req.body;
    //     product = await removeFromFavorite(product.id, payload.user.id, product.airtableId);
    //     res.status(200).json({ status: 'deleted', product });
    //   } catch (error) {
    //     res.status(422).json({ status: 'not_deleted', error });
    //   }
    //   break;
    // }
    default:
      res.status(400);
  }
};

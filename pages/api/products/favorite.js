import { addToFavorite, removeFromFavorite } from 'services/products/favorite';
import { getProduct } from 'services/products/getProduct';

export default async (req, res) => {
  let product = await getProduct(req.body.product.id);

  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        product = await addToFavorite(product.id, payload.user.id, product.airtableId);
        res.status(200).json({ status: 'updated', product });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }
    case 'DELETE': {
      try {
        const payload = req.body;
        product = await removeFromFavorite(product.id, payload.user.id, product.airtableId);
        res.status(200).json({ status: 'deleted', product });
      } catch (error) {
        res.status(422).json({ status: 'not_deleted', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

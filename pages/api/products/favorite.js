import addToFavorite from 'services/products/addToFavorite';
import { getProduct } from 'services/products/getProduct';
import isAuthorized from 'services/products/isAuthorized';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  //check session
  const session = await getSession({ req });
  let product = await getProduct(req.body.product.id);

  if (!isAuthorized(product, session)) {
    return res.status(401).json({ error: 'not_authorized' });
  }

  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        product = await addToFavorite(product.airtableId, payload.user.id);
        res.status(200).json({ status: 'updated', product });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

import { getProducts } from 'services/products/getProduct';
import createProduct from 'services/products/create';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const products = await getProducts();
      res.status(200).json(products);

      break;
    }
    case 'POST': {
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: 'not_authorized' });
        }

        const payload = req.body;
        const userId = session.user.id;
        const product = await createProduct(payload, userId);
        res.status(200).json({ status: 'created', product });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }

      break;
    }
    default:
      res.status(400);
  }
};

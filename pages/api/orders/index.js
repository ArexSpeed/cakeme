import create from 'services/orders/create';
import { getSession } from 'next-auth/client';
import { getProduct } from 'services/products/getProduct';

export default async (req, res) => {
  switch (req.method) {
    // case 'GET': {
    //   const products = await getProducts();
    //   res.status(200).json(products);

    //   break;
    // }
    case 'POST': {
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: 'not_authorized' });
        }

        const payload = req.body;
        const userId = session.user.id;
        const product = await getProduct(payload.product.id);
        const order = await create(payload, product, userId);
        res.status(200).json({ status: 'created', order });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }

      break;
    }
    default:
      res.status(400);
  }
};

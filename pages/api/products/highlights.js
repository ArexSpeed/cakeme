import { getProduct } from 'services/products/getProduct';
import { addHighlight } from 'services/products/highlights';

export default async (req, res) => {
  let product = await getProduct(req.body.item.id);

  switch (req.method) {
    case 'PUT': {
      try {
        product = await addHighlight(product.airtableId);
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

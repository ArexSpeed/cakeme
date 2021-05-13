import createCheckout from 'services/checkout/create';

export default async (req, res) => {
  console.log(req.body, 'body checkout');
  switch (req.method) {
    case 'POST': {
      try {
        const highlightItem = req.body.item;
        const checkout = await createCheckout(highlightItem);

        res.status(200).json({ status: 'created', checkout });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

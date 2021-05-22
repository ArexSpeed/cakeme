import { getSession } from 'next-auth/client';
import createCheckout from 'services/checkout/create';
import { getUser } from 'services/users/getUser';
export default async (req, res) => {
  const session = await getSession({ req });
  switch (req.method) {
    case 'POST': {
      try {
        const highlightItem = req.body.item;
        const user = await getUser(session.user.email);
        const checkout = await createCheckout(highlightItem, user);

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

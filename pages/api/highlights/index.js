import { getSession } from 'next-auth/client';
import { substractHighlights } from 'services/users/highlights';

export default async (req, res) => {
  //check session
  const session = await getSession({ req });
  //let product = await getUser(req.query.id);
  console.log(session, 'session');


  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        const user = await substractHighlights(session.user.id, payload.restQty);
        res.status(200).json({ status: 'updated', user });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
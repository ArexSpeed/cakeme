import update from 'services/offers/update';
import deleteOffer from 'services/offers/delete';
import { getProduct } from 'services/offers/getProduct';
import isAuthorized from 'services/offers/isAuthorized';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  //check session
  const session = await getSession({ req });
  let offer = await getProduct(req.query.id);

  if (!isAuthorized(offer, session)) {
    return res.status(401).json({ error: 'not_authorized' });
  }

  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        offer = await update(offer.airtableId, payload);
        res.status(200).json({ status: 'updated', offer });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }
    case 'DELETE': {
      try {
        offer = await deleteOffer(offer.airtableId);
        res.status(200).json({ status: 'deleted', offer });
      } catch (error) {
        res.status(422).json({ status: 'not_deleted', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

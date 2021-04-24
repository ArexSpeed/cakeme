import getOffers from 'services/offers/getOffers';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const offers = await getOffers();
      res.status(200).json(offers);

      break;
    }
    default:
      res.status(400);
  }
};

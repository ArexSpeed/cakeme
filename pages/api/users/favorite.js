import { getFavorite } from 'services/users/getFavorite';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const session = await getSession({ req });
      const userEmail = session.user;
      const favorites = await getFavorite(userEmail);
      res.status(200).json(favorites);
      break;
    }
    default:
      res.status(400);
  }
};

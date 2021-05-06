import { getFavorites } from 'services/favorites/getFavorites';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const favorites = await getFavorites();
      //console.log(favorites, 'get fav in api')
      res.status(200).json(favorites);

      break;
    }
    default:
      res.status(400);
  }
};

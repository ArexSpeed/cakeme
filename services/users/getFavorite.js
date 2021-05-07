import airDB from 'services/airtableClient';

export const getFavorite = async ({ email }) => {
  const favorites = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
  console.log(email, 'email in service');
  console.log(favorites, 'favs in service');
  return favorites.map((favorite) => favorite.fields.favoriteId);
};

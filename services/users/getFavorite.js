import airDB from 'services/airtableClient';

export const getFavorite = async ({ email }) => {
  const favorites = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
  return favorites.map((favorite) => favorite.fields.favoriteId);
};

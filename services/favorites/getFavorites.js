import airDB from 'services/airtableClient';

export const getFavorites = async (id) => {
  console.log('detFav');
  const favorites = await airDB('favorites')
    .select({
      sort: [{ filterByFormula: `id="${id}"` }]
    })
    .firstPage();
  return favorites.map((favorite) => favorite.fields);
};

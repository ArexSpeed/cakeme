import airDB from 'services/airtableClient';

const addToFavorite = async (airtableId, userId) => {
  const product = await airDB('products').update([
    {
      id: airtableId,
      fields: {
        favorite: [userId]
      }
    }
  ]);

  return product;
};

export default addToFavorite;

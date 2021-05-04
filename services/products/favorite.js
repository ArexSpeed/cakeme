import airDB from 'services/airtableClient';

export const addToFavorite = async (productId, userId, airtableId) => {
  let product = await airDB('products')
    .select({ filterByFormula: `id="${productId}"` })
    .firstPage();
  const likes = product.map((item) => item.fields.favorite); // show all favorite users
  const currentUsers = likes[0]?.filter((item) => item); //get current user who likes
  if (currentUsers) {
    product = await airDB('products').update([
      {
        id: airtableId,
        fields: {
          favorite: [...currentUsers, userId]
        }
      }
    ]);
  } else {
    product = await airDB('products').update([
      {
        id: airtableId,
        fields: {
          favorite: [userId]
        }
      }
    ]);
  }

  return product;
};

export const removeFromFavorite = async (productId, userId, airtableId) => {
  let product = await airDB('products')
    .select({ filterByFormula: `id="${productId}"` })
    .firstPage();
  const likes = product.map((item) => item.fields.favorite); //array with all users who likes this product
  const filteredUsers = likes[0].filter((item) => item !== userId); // remove user who unlike
  product = await airDB('products').update([
    {
      id: airtableId,
      fields: {
        favorite: [...filteredUsers]
      }
    }
  ]);

  return product;
};

import airDB from 'services/airtableClient';

export const addToFavorite = async (product, productId, userId) => {
  console.log(productId, userId, 'in add');
  let favorite = await airDB('favorites')
    .select({ filterByFormula: `productId="${productId}"` })
    .firstPage();
  //console.log(favorite, 'show favorite');
  if (favorite.length > 0) {
    console.log(favorite.id, 'favID');
    const getid = favorite.map((item) => item.id);
    console.log(getid[0], 'get ID');
    const airtbal = getid[0];
    const likes = favorite.map((item) => item.fields.users); // show all favorite users
    console.log(likes, 'likes');
    const currentUsers = likes[0]?.filter((item) => item); //get current user who likes
    if (currentUsers) {
      favorite = await airDB('favorites').update([
        {
          id: airtbal,
          fields: {
            users: [...currentUsers, userId]
          }
        }
      ]);
    }
  } else {
    favorite = await airDB('favorites').create([
      {
        fields: {
          product: [product],
          users: [userId]
        }
      }
    ]);
  }

  return favorite;
};

// export const addToFavorite = async (productId, userId, airtableId) => {
//   console.log(productId, 'in add');
//   let favorite = await airDB('favorites')
//     .select({ filterByFormula: `productId="${productId}"` })
//     .firstPage();
//   const likes = favorite.map((item) => item.fields.users); // show all favorite users
//   const currentUsers = likes[0]?.filter((item) => item); //get current user who likes
//   if (currentUsers) {
//     favorite = await airDB('favorites').update([
//       {
//         id: airtableId,
//         fields: {
//           user: [...currentUsers, userId]
//         }
//       }
//     ]);
//   } else {
//     favorite = await airDB('favorites').update([
//       {
//         id: airtableId,
//         fields: {
//           user: [userId]
//         }
//       }
//     ]);
//   }

//   return favorite;
// };

// export const removeFromFavorite = async (productId, userId, airtableId) => {
//   let favorite = await airDB('products')
//     .select({ filterByFormula: `id="${productId}"` })
//     .firstPage();
//   const likes = product.map((item) => item.fields.favorite); //array with all users who likes this product
//   const filteredUsers = likes[0].filter((item) => item !== userId); // remove user who unlike
//   product = await airDB('products').update([
//     {
//       id: airtableId,
//       fields: {
//         favorite: [...filteredUsers]
//       }
//     }
//   ]);

//   return product;
// };

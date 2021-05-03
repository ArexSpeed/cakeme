import airDB from 'services/airtableClient';

export const getProducts = async () => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'desc' }]
    })
    .firstPage();

  return products.map((product) => product.fields);
};

export const getProduct = async (id) => {
  const products = await airDB('products')
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (products && products[0]) {
    return { airtableId: products[0].id, ...products[0].fields };
  }
};

export const getMyProducts = async (email) => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `email="${email}"`
    })
    .firstPage();

  return products.map((product) => product.fields);
};

export const getMyFavoriteProducts = async (email) => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `SEARCH("${email}",favoriteEmail)`
    })
    .firstPage();

  return products.map((product) => product.fields);
};

export const getBakeryProducts = async (bakery) => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `bakery="${bakery}"`
    })
    .firstPage();

  return products.map((product) => product.fields);
};

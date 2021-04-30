import airDB from 'services/airtableClient';

const getProducts = async () => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'desc' }]
    })
    .firstPage();

  return products.map((product) => product.fields);
};

export default getProducts;

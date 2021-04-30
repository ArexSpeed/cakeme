import airDB from 'services/airtableClient';

const getBakeryProducts = async (bakery) => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `bakery="${bakery}"`
    })
    .firstPage();

  return products.map((product) => product.fields);
};

export default getBakeryProducts;

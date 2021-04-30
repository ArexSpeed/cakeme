import airDB from 'services/airtableClient';

const deleteProduct = async (airtableId) => {
  const product = await airDB('products').destroy([airtableId]);

  return product;
};

export default deleteProduct;

import airDB from 'services/airtableClient';

const create = async (payload, product, userId) => {
  console.log(payload, 'payload in service');
  console.log(product, 'product in services');
  const order = await airDB('orders').create([
    {
      fields: {
        productId: [product.airtableId],
        user: [userId],
        qty: payload.product.qty,
        message: payload.message,
        status: 'init'
      }
    }
  ]);

  return order;
};

export default create;

import airDB from 'services/airtableClient';

const create = async (payload, product, userId) => {
  const order = await airDB('orders').create([
    {
      fields: {
        orderId: payload.orderId,
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

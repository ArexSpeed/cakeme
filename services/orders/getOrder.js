import airDB from 'services/airtableClient';

export const getCustomerOrders = async (userEmail) => {
  const orders = await airDB('orders')
    .select({ filterByFormula: `userEmail="${userEmail}"` })
    .firstPage();

  return orders.map((order) => order.fields);
};

export const getBakeryOrders = async (bakery) => {
  const orders = await airDB('orders')
    .select({ filterByFormula: `bakery: '${bakery}` })
    .firstPage();

  return orders.map((order) => order.fields);
};

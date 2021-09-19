import airDB from 'services/airtableClient';

export const getCustomerOrders = async (userEmail) => {
  const orders = await airDB('orders')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `userEmail="${userEmail}"`
    })
    .firstPage();

  return orders.map((order) => order.fields);
};

export const getBakeryOrders = async (bakery) => {
  const orders = await airDB('orders')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `bakeryEmail="${bakery}"`
    })
    .firstPage();

  return orders.map((order) => order.fields);
};

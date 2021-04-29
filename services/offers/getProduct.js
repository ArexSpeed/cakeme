import airDB from 'services/airtableClient';

const getProduct = async (id) => {
  const offers = await airDB('offers')
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (offers && offers[0]) {
    return { airtableId: offers[0].id, ...offers[0].fields };
  }
};

export const getMyProducts = async (email) => {
  const offers = await airDB('offers')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `email="${email}"`
    })
    .firstPage();

  return offers.map((offer) => offer.fields);
};

export default getProduct;

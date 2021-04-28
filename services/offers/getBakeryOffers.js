import airDB from 'services/airtableClient';

const getBakeryOffers = async (bakery) => {
  const offers = await airDB('offers')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `bakery="${bakery}"`
    })
    .firstPage();

  return offers.map((offer) => offer.fields);
};

export default getBakeryOffers;

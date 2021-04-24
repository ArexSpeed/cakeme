import airDB from 'services/airtableClient';

const getOffers = async () => {
  const offers = await airDB('offers')
    .select({
      sort: [{ field: 'id', direction: 'desc' }]
    })
    .firstPage();

  return offers.map((offer) => offer.fields);
};

export default getOffers;

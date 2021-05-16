import airDB from 'services/airtableClient';

// pages/api/products
export const addHighlight = async (airtableId) => {
  const product = await airDB('products').update([
    {
      id: airtableId,
      fields: {
        highlightTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // next X days in future
      }
    }
  ]);

  return product;
};

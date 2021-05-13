import airDB from 'services/airtableClient';

export const substractHighlights = async (userEmail, item) => {
  const highlights = await airDB('highlights')
    .select({
      sort: [{ field: 'id', direction: 'asc' }]
    })
    .firstPage();

  return highlights.map((highlight) => highlight.fields);
};

export const updateProductHighlights = async (item) => {
  const products = await airDB('products')
    .select({
      sort: [{ field: 'id', direction: 'asc' }]
    })
    .firstPage();

  return highlights.map((highlight) => highlight.fields);
};

const update = async (airtableId, payload) => {
  const validatedProduct = await schema.validateAsync(payload);
  const product = await airDB('products').update([
    {
      id: airtableId,
      fields: { ...validatedProduct }
    }
  ]);

  return product;
};
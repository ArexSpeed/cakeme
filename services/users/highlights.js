import airDB from 'services/airtableClient';

export const getUserHighlights = async (email) => {
  console.log(email, 'services email');
  const highlights = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
  console.log(highlights, 'services hig');
  return highlights.map((highlight) => highlight.fields.highlights);
};

export const substractHighlights = async (airtableId, restQty) => {
  console.log('substract work', airtableId)
  const highlights = await airDB('users').update([
    {
      id: airtableId,
      fields: {
        highlights: restQty
      }
    }
  ]);
  console.log(highlights, 'high services');
  return highlights;
};

// const update = async (airtableId, payload) => {
//   const validatedProduct = await schema.validateAsync(payload);
//   const product = await airDB('products').update([
//     {
//       id: airtableId,
//       fields: { ...validatedProduct }
//     }
//   ]);

//   return product;
// };
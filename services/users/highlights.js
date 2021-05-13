import airDB from 'services/airtableClient';

export const getUserHighlights = async (email) => {
  console.log(email, 'services email');
  const highlights = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
  console.log(highlights, 'services hig');
  return highlights.map((highlight) => highlight.fields.highlights);
};

export const substractHighlights = async (airtableId, restHighlights) => {
  const highlights = await airDB('users').update([
    {
      id: airtableId,
      fields: {
        highlights: restHighlights
      }
    }
  ]);
  console.log(highlights, 'high services');
  return highlights;
};

import airDB from 'services/airtableClient';

export const getUserHighlights = async (email) => {
  const highlights = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
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
  return highlights;
};

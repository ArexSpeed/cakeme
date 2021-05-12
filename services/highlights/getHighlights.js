import airDB from 'services/airtableClient';

export const getHighlights = async () => {
  const highlights = await airDB('highlights')
    .select({
      sort: [{ field: 'id', direction: 'asc' }]
    })
    .firstPage();

  return highlights.map((highlight) => highlight.fields);
};

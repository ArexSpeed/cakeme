import airDB from 'services/airtableClient';

export const getHighlights = async () => {
  const highlights = await airDB('highlights')
    .select({
      sort: [{ field: 'id', direction: 'asc' }]
    })
    .firstPage();

  return highlights.map((highlight) => ({ airtableId: highlight.id, ...highlight.fields }));
};

export const getHighlightToPay = async (airtableId) => {
  const highlight = await airDB('highlights').find(airtableId);
  if (highlight) {
    return { id: highlight.id, ...highlight.fields };
  }

  return highlight;
};

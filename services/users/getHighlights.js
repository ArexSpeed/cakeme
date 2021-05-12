import airDB from 'services/airtableClient';

export const getUserHighlights = async (email) => {
  console.log(email, 'services email');
  const highlights = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
  console.log(highlights, 'services hig');
  return highlights.map((highlight) => highlight.fields.highlights);
};

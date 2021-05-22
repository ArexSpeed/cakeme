import airDB from 'services/airtableClient';

export const getUser = async (email) => {
  const users = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (users && users[0]) {
    return { airtableId: users[0].id, ...users[0].fields };
  }
};

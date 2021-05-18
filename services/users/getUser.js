import airDB from 'services/airtableClient';

export const getUser = async (email) => {
  //console.log(email, 'user in GetUser');
  const users = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();
  //console.log(users, 'finded user');
  if (users && users[0]) {
    return { airtableId: users[0].id, ...users[0].fields };
  }
};

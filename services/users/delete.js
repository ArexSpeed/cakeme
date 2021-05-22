import airDB from 'services/airtableClient';

const deleteUser = async (airtableId) => {
  const user = await airDB('users').destroy([airtableId]);

  return user;
};

export default deleteUser;

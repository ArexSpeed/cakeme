import airDB from 'services/airtableClient';

const deleteUser = async (airtableId) => {
  console.log(airtableId, 'deleting user in services');
  const user = await airDB('users').destroy([airtableId]);

  return user;
};

export default deleteUser;

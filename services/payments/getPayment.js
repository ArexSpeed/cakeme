import airDB from 'services/airtableClient';

export const getPayment = async (id) => {
  console.log(id, 'getPayment id');
  const payments = await airDB('payments')
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (payments && payments[0]) {
    return { airtableId: payments[0].id, ...payments[0].fields };
  }
};

export const getUserPayments = async (email) => {
  const payments = await airDB('payments')
    .select({ filterByFormula: `userEmail="${email}"` })
    .firstPage();

  return payments.map((payment) => payment.fields);
};

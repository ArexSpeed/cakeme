import airDB from 'services/airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid('Cakes', 'Breads', 'Donuts').required(),
  price: Joi.number().greater(0).required(),
  ingredients: Joi.string().required(),
  location: Joi.string().required()
});

const update = async (airtableId, payload) => {
  const validatedOffer = await schema.validateAsync(payload);
  const offer = await airDB('offers').update([
    {
      id: airtableId,
      fields: { ...validatedOffer }
    }
  ]);

  return offer;
};

export default update;

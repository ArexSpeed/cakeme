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

const create = async (payload, userId) => {
  const validatedOffer = await schema.validateAsync(payload);
  const offer = await airDB('offers').create([
    {
      fields: {
        ...validatedOffer,
        users: [userId]
      }
    }
  ]);

  return offer;
};

export default create;

import airDB from 'services/airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid('Cakes', 'Breads', 'Donuts', 'Cookies').required(),
  price: Joi.number().greater(0).required(),
  ingredients: Joi.string().required(),
  location: Joi.string().required(),
  imageUrl: Joi.string()
});

const update = async (airtableId, payload) => {
  const validatedProduct = await schema.validateAsync(payload);
  const product = await airDB('products').update([
    {
      id: airtableId,
      fields: { ...validatedProduct }
    }
  ]);

  return product;
};

export default update;

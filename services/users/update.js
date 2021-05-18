import airDB from 'services/airtableClient';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  emailNew: Joi.string().email().required(),
  fullName: Joi.string().required(),
  bakeryName: Joi.string().required(),
  updateForm: Joi.string().required()
});

const schemaPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  updateForm: Joi.string().required()
});

export const updateName = async (airtableId, payload) => {
  const { fullName, emailNew, bakeryName } = await schema.validateAsync(payload);
  console.log(airtableId, 'airt in updateName');
  const user = await airDB('users').update([
    {
      id: airtableId,
      fields: {
        fullName,
        email: emailNew,
        bakeryName
      }
    }
  ]);

  return user;
};

export const updatePassword = async (airtableId, payload) => {
  const { password } = await schemaPassword.validateAsync(payload);

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);

  const user = await airDB('users').update([
    {
      id: airtableId,
      fields: {
        passwordSalt,
        passwordHash
      }
    }
  ]);

  return user;
};

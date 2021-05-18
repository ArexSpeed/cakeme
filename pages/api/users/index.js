import createUser from 'services/users/create';
import deleteUser from 'services/users/delete';
import { getUser } from 'services/users/getUser';
import { updateName, updatePassword } from 'services/users/update';

export default async (req, res) => {
  switch (req.method) {
    case 'POST': {
      try {
        const payload = req.body;
        const user = await createUser(payload);

        res.status(200).json({ status: 'created', user });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }
    case 'PUT': {
      try {
        const payload = req.body;
        const user = await getUser(payload.email);
        if (payload.updateForm === 'accountName') {
          const update = await updateName(user.airtableId, payload);
          res.status(200).json({ status: 'created', update });
        }
        if (payload.updateForm === 'accountPassword') {
          const update = await updatePassword(user.airtableId, payload);
          res.status(200).json({ status: 'created', update });
        }
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }
    case 'DELETE': {
      try {
        const payload = req.body;
        const user = await getUser(payload.email);
        const userDelete = await deleteUser(user.airtableId);
        res.status(200).json({ status: 'deleted', userDelete });
      } catch (error) {
        res.status(422).json({ status: 'not_deleted', error });
      }
      break;
    }
    default:
      res.status(400);
  }
};

import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
// eslint-disable-next-line no-empty-pattern
const [{}, dispatch] = useContext(GlobalContext);

export const getActionInfo = (type, product) => {
  switch (type) {
    case 'create':
      return dispatch({
        type: 'SET_ACTION_INFO',
        payload: { active: true, text: `You added ${product}` }
      });
    case 'edit':
      return dispatch({
        type: 'SET_ACTION_INFO',
        payload: { active: true, text: `Edit correct ${product}` }
      });
    case 'delete':
      return dispatch({
        type: 'SET_ACTION_INFO',
        payload: { active: true, text: `Delete ${product}` }
      });
    default:
      return;
  }
};

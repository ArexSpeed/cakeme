import { useEffect, useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';

const ActionInfo = () => {
  const [{ actionInfo }, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    if (actionInfo.active) {
      setTimeout(() => {
        dispatch({ type: 'SET_ACTION_INFO', payload: { active: false, text: '' } });
      }, 3000);
    }
  }, [actionInfo]);

  return actionInfo.active ? (
    <div className="actionInfo">
      <p>{actionInfo.text}</p>
    </div>
  ) : (
    <></>
  );
};

export default ActionInfo;

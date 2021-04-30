import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';

const ActionInfo = () => {
  const [{ actionInfo }] = useContext(GlobalContext);
  return (
    <div className="actionInfo">
      <p>{actionInfo.text}</p>
    </div>
  );
};

export default ActionInfo;

import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import { AddShoppingCart } from '@material-ui/icons';

const AddToCartButton = ({ item }) => {
  const [{ bagItems }, dispatch] = useContext(GlobalContext);

  const addToCart = () => {
    dispatch({
      type: actionTypes.ADD_TO_BAG,
      payload: item
    });
  };
  return (
    <button onClick={addToCart}>
      <AddShoppingCart />
    </button>
  );
};

export default AddToCartButton;

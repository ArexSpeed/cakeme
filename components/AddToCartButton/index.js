import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import { AddShoppingCart } from '@material-ui/icons';

const AddToCartButton = ({ item }) => {
  const [{ bagItems }, dispatch] = useContext(GlobalContext);

  const addToCart = () => {
    const newItem = bagItems.filter((bag) => bag.id === item.id);
    console.log(newItem, 'new Item');
    if (newItem.length < 1) {
      //add new item
      dispatch({
        type: actionTypes.ADD_TO_BAG,
        payload: { ...item, qty: 1 }
      });
    } else {
      //add qty to exist
      dispatch({
        type: actionTypes.PLUS_ITEM_TO_BAG,
        payload: item.id
      });
    }
  };

  return (
    <button onClick={addToCart}>
      <AddShoppingCart />
    </button>
  );
};

export default AddToCartButton;

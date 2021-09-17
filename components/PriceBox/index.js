import { useState, useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const PriceSlider = withStyles({
  root: {
    color: '#dc934f',
    height: 10
  },
  thumb: {
    height: 0,
    width: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  track: {
    height: 20,
    borderRadius: 10
  },
  rail: {
    height: 20,
    borderRadius: 10
  }
})(Slider);

const PriceBox = () => {
  const [{ searchProduct, searchProductCategory }, dispatch] = useContext(GlobalContext);
  const [priceValue, setPriceValue] = useState([0, 300]);

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
    dispatch({
      type: actionTypes.SET_PRICE_PRODUCT,
      payload: priceValue
    });
  };

  const handleChangeCategory = (category) => {
    dispatch({
      type: actionTypes.SET_PRODUCT_CATEGORY,
      payload: category
    });
  };
  return (
    <div className="priceBox">
    <p style={{ margin: '-5px' }}>Price range</p>
    <PriceSlider
      value={priceValue}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      max={300}
    />
    <p style={{ marginTop: '5px' }}>
      From ${priceValue[0]} - {priceValue[1]}
    </p>
  </div>
  )
}

export default PriceBox;

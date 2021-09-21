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
    borderRadius: 4
  },
  rail: {
    height: 20,
    borderRadius: 4
  }
})(Slider);

const PriceBox = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);
  const [priceValue, setPriceValue] = useState([0, 300]);

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
    dispatch({
      type: actionTypes.SET_PRICE_PRODUCT,
      payload: priceValue
    });
  };

  return (
    <div className="priceBox">
      <p className="priceBox__title">Filter by price</p>
      <PriceSlider
        value={priceValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        max={300}
      />
      <p className="priceBox__range">
        From €{priceValue[0]} - {priceValue[1]}
      </p>
    </div>
  );
};

export default PriceBox;

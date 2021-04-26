import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
//style Search

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

const Search = () => {
  const [value, setValue] = useState([0, 300]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value, 'value');
  };
  return (
    <section className="search">
      <article className="search__container">
        <div className="search__box">
          <SearchIcon />
          <input type="text" placeholder="Find by name, category, ingridiens" />
        </div>
        <div className="priceBox">
          <p style={{ margin: '-5px' }}>Price range</p>
          <PriceSlider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={1000}
          />
          <p style={{ marginTop: '5px' }}>
            From ${value[0]} - {value[1]}
          </p>
        </div>
      </article>
      <article className="category">
        <h3>Categories:</h3>
        <div className="category__container">
          <div className="category__box">
            <img
              src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
              alt="cakes"
            />
            <h5>All</h5>
          </div>
          <div className="category__box">
            <img
              src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
              alt="cakes"
            />
            <h5>Cakes</h5>
          </div>
          <div className="category__box">
            <img
              src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
              alt="cakes"
            />
            <h5>Cakes</h5>
          </div>
          <div className="category__box">
            <img
              src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
              alt="cakes"
            />
            <h5>Cakes</h5>
          </div>
          <div className="category__box">
            <img
              src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
              alt="cakes"
            />
            <h5>Cakes</h5>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Search;

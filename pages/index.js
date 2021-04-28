import { useState } from 'react';
import CardItem from 'components/CardItem';
import Layout from 'components/Layout';
//import Search from 'components/Search';
import useSWR from 'swr';
import getOffers from 'services/offers/getOffers';
import { jsonFetcher } from 'utils';
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

export const getStaticProps = async () => {
  const offers = await getOffers();

  return {
    props: {
      offers
    }
  };
};

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

export default function Home({ offers }) {
  const { data } = useSWR('/api/offers', jsonFetcher, { initialData: offers });
  const [priceValue, setPriceValue] = useState([0, 300]);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  return (
    <Layout>
      <>
        <section className="search">
          <article className="search__container">
            <div className="search__box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Find by name, category, ingridiens"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
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
          </article>
          <article className="category">
            <h3>Categories:</h3>
            <div className="category__container">
              <button
                className={category === '' ? 'category__box active' : 'category__box'}
                onClick={() => setCategory('')}>
                <img
                  src="https://www.supermarketperimeter.com/ext/resources/images/0/9/2/6/b/4/5/8/8/0/september/0926bakedgoods_shutterstock_2240854.jpg?t=1568751072&width=1080"
                  alt="all"
                />
                <h5>All</h5>
              </button>
              <button
                className={category === 'Cakes' ? 'category__box active' : 'category__box'}
                onClick={() => setCategory('Cakes')}>
                <img
                  src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
                  alt="cakes"
                />
                <h5>Cakes</h5>
              </button>
              <button
                className={category === 'Breads' ? 'category__box active' : 'category__box'}
                onClick={() => setCategory('Breads')}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Anadama_bread_%281%29.jpg/1200px-Anadama_bread_%281%29.jpg"
                  alt="breads"
                />
                <h5>Breads</h5>
              </button>
              <button
                className={category === 'Donuts' ? 'category__box active' : 'category__box'}
                onClick={() => setCategory('Donuts')}>
                <img
                  src="https://images.pexels.com/photos/3779937/pexels-photo-3779937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="donuts"
                />
                <h5>Donuts</h5>
              </button>
              <button
                className={category === 'Cookies' ? 'category__box active' : 'category__box'}
                onClick={() => setCategory('Cookies')}>
                <img
                  src="https://hostimul.com/uploads/catalog/blog/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg"
                  alt="cookies"
                />
                <h5>Cookies</h5>
              </button>
            </div>
          </article>
        </section>
        <p className="section">All Products: </p>
        <section className="section">
          {data.map((item) => {
            console.log(item.name, 'names');
            if (
              (item.name.includes(searchValue) ||
                item.ingredients.includes(searchValue) ||
                item.bakery[0].includes(searchValue) ||
                item?.location?.includes(searchValue)) &&
              item.category.includes(category) &&
              item.price >= priceValue[0] &&
              item.price <= priceValue[1]
            ) {
              return <CardItem key={item.id} item={item} />;
            }
          })}
        </section>
      </>
    </Layout>
  );
}

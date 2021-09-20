import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
  const [{ searchProduct, searchProductCategory }, dispatch] = useContext(GlobalContext);

  const handleChangeCategory = (category) => {
    dispatch({
      type: actionTypes.SET_PRODUCT_CATEGORY,
      payload: category
    });
  };

  return (
    <section className="search">
      <article className="search__box">
        <SearchIcon />
        <input
          type="text"
          placeholder="Find by name, ingredients, bakery"
          value={searchProduct}
          onChange={(e) =>
            dispatch({ type: actionTypes.SET_SEARCH_PRODUCT, payload: e.target.value })
          }
        />
      </article>
      <article className="category">
        <h3 className="category__title">Categories:</h3>
        <div className="category__container">
          <button
            className={searchProductCategory === '' ? 'category__box active' : 'category__box'}
            onClick={() => handleChangeCategory('')}>
            <img
              src="https://www.supermarketperimeter.com/ext/resources/images/0/9/2/6/b/4/5/8/8/0/september/0926bakedgoods_shutterstock_2240854.jpg?t=1568751072&width=1080"
              alt="all"
            />
            <h5>All</h5>
          </button>
          <button
            className={searchProductCategory === 'Cakes' ? 'category__box active' : 'category__box'}
            onClick={() => handleChangeCategory('Cakes')}>
            <img
              src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
              alt="cakes"
            />
            <h5>Cakes</h5>
          </button>
          <button
            className={
              searchProductCategory === 'Breads' ? 'category__box active' : 'category__box'
            }
            onClick={() => handleChangeCategory('Breads')}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Anadama_bread_%281%29.jpg/1200px-Anadama_bread_%281%29.jpg"
              alt="breads"
            />
            <h5>Breads</h5>
          </button>
          <button
            className={
              searchProductCategory === 'Donuts' ? 'category__box active' : 'category__box'
            }
            onClick={() => handleChangeCategory('Donuts')}>
            <img
              src="https://images.pexels.com/photos/3779937/pexels-photo-3779937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="donuts"
            />
            <h5>Donuts</h5>
          </button>
          <button
            className={
              searchProductCategory === 'Cookies' ? 'category__box active' : 'category__box'
            }
            onClick={() => handleChangeCategory('Cookies')}>
            <img
              src="https://hostimul.com/uploads/catalog/blog/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg"
              alt="cookies"
            />
            <h5>Cookies</h5>
          </button>
        </div>
      </article>
    </section>
  );
};

export default Search;

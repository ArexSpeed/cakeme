export const initialState = {
  actionInfo: {
    active: false,
    text: ''
  },
  searchProduct: '',
  priceProduct: [0, 300],
  searchProductCategory: ''
};

export const actionTypes = {
  SET_ACTION_INFO: 'SET_ACTION_INFO',
  SET_SEARCH_PRODUCT: 'SET_SEARCH_PRODUCT',
  SET_PRICE_PRODUCT: 'SET_PRICE_PRODUCT',
  SET_PRODUCT_CATEGORY: 'SET_PRODUCT_CATEGORY'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTION_INFO':
      return {
        ...state,
        actionInfo: action.payload
      };
    case actionTypes.SET_SEARCH_PRODUCT:
      return {
        ...state,
        searchProduct: action.payload
      };
    case actionTypes.SET_PRICE_PRODUCT:
      return {
        ...state,
        priceProduct: action.payload
      };
    case actionTypes.SET_PRODUCT_CATEGORY:
      return {
        ...state,
        searchProductCategory: action.payload
      };

    default:
      return state;
  }
};

export default reducer;

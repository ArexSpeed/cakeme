// const bagItemsFromStorage = localStorage.getItem('bagItems')
//   ? JSON.parse(localStorage.getItem('bagItems'))
//   : [];

export const initialState = {
  actionInfo: {
    active: false,
    text: ''
  },
  searchProduct: '',
  priceProduct: [0, 300],
  searchProductCategory: '',
  bagItems: []
};

export const actionTypes = {
  SET_ACTION_INFO: 'SET_ACTION_INFO',
  SET_SEARCH_PRODUCT: 'SET_SEARCH_PRODUCT',
  SET_PRICE_PRODUCT: 'SET_PRICE_PRODUCT',
  SET_PRODUCT_CATEGORY: 'SET_PRODUCT_CATEGORY',
  RESET_SEARCH: 'RESET_SEARCH',
  ADD_TO_BAG: 'ADD_TO_BAG',
  PLUS_ITEM_TO_BAG: 'PLUS_ITEM_TO_BAG',
  MINUS_ITEM_TO_BAG: 'MINUS_ITEM_TO_BAG',
  DELETE_BAG_ITEM: 'DELETE_BAG_ITEM'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTION_INFO:
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
    case actionTypes.RESET_SEARCH:
      return {
        ...state,
        searchProduct: '',
        priceProduct: [0, 300],
        searchProductCategory: ''
      };
    case actionTypes.ADD_TO_BAG:
      return {
        ...state,
        bagItems: [...state.bagItems, action.payload]
      };
    case actionTypes.PLUS_ITEM_TO_BAG:
      console.log(action.payload, 'add qty');
      return {
        ...state,
        qty: state.bagItems.filter((x) => x.id === action.payload && x.qty++)
      };
    case actionTypes.MINUS_ITEM_TO_BAG:
      console.log(action.payload, 'minus qty');
      return {
        ...state,
        qty: state.bagItems.filter((x) => x.id === action.payload && x.qty--)
      };
    case actionTypes.DELETE_BAG_ITEM:
      console.log(action.payload, 'item to delete');
      return {
        ...state,
        bagItems: state.bagItems.filter((x) => x.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;

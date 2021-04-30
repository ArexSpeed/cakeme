export const initialState = {
  actionInfo: {
    active: false,
    text: ''
  }
};

export const actionTypes = {
  SET_ACTION_INFO: 'SET_ACTION_INFO'
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_ACTION_INFO':
      return {
        ...state,
        actionInfo: action.payload
      };

    default:
      return state;
  }
};

export default reducer;

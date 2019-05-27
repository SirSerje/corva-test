const reducer = (state = {items: []}, action) => {
  switch (action.type) {
    case 'DATA':
      return {
        ...state, items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};
export default reducer;
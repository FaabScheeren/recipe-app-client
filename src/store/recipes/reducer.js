const initialState = [];

export default recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_recipes":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

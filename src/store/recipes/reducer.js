// const initialState = [];

// export default recipesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "add_recipes":
//       return [...action.payload];
//     default:
//       return state;
//   }
// };

const initialState = {
  recipeDetails: null,
  recipes: [],
};

export default recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_recipes":
      return { ...state, recipes: [...action.payload] };
    case "store_recipe_details":
      return { ...state, recipeDetails: { ...action.payload } };
    default:
      return state;
  }
};

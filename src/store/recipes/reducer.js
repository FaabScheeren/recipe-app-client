const initialState = {
  recipeDetails: null,
  recipes: [],
  categories: [],
};

export default recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_recipes":
      return { ...state, recipes: [...action.payload] };
    case "store_recipe_details":
      return { ...state, recipeDetails: { ...action.payload } };
    case "add_recipe":
      return { ...state, recipes: [...state.recipes, action.payload] };
    case "save_categories":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

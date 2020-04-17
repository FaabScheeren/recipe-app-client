import recipeApi from "../../config/api";

const storeRecipe = (recipe) => {
  return {
    type: "add_recipes",
    payload: recipe,
  };
};

export const getRecipes = () => {
  return async (dispatch, getState) => {
    const response = await recipeApi.get("/recipes");
    console.log("RESPONSE", response);

    dispatch(storeRecipe(response.data));
  };
};

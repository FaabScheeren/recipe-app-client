import recipeApi from "../../config/api";

const storeRecipe = (recipe) => {
  return {
    type: "add_recipes",
    payload: recipe,
  };
};

const storeRecipeDetails = (recipe) => {
  return {
    type: "store_recipe_details",
    payload: recipe,
  };
};

export const getRecipes = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    try {
      const response = await recipeApi.get("/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("RESPONSE", response);

      dispatch(storeRecipe(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getRecipeDetails = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    try {
      const response = await recipeApi.get(`/recipes/details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(storeRecipeDetails(response.data));
    } catch (e) {}
  };
};

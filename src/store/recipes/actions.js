import recipeApi from "../../config/api";

const storeRecipes = (recipe) => {
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

const storeRecipe = (recipe) => {
  return {
    type: "add_recipe",
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

      dispatch(storeRecipes(response.data));
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
      // console.log("Recipe details response", response.data);
      dispatch(storeRecipeDetails(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addRecipeThunk = (
  title,
  description,
  step,
  cookingTime,
  category,
  ingredient
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    try {
      const response = await recipeApi.post("recipes", {
        data: { title, description, step, cookingTime, category, ingredient },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response adding new recipe to database", response.data);
      dispatch(storeRecipe(response.data));
    } catch (e) {}
  };
};

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

const storeCategories = (categories) => {
  return {
    type: "save_categories",
    payload: categories,
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
  stepsArray,
  cookingTime,
  category,
  ingredientsArray,
  photo,
  is_public
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    try {
      const response = await recipeApi.post(
        "/recipes",
        {
          title,
          description,
          stepsArray,
          cookingTime,
          category,
          ingredientsArray,
          photo,
          is_public,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(storeRecipe(response.data));
      const recipeState = getState().recipes.recipes;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCategoriesThunk = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    try {
      const response = await recipeApi("/recipes/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("RESPONSE", response.data);
      dispatch(storeCategories(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

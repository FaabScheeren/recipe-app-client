import recipeApi from "../../config/api";
import { getUserCategories } from "../user/actions";
import { appLoading, appDoneLoading } from "../appState/actions";

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
    dispatch(appLoading());

    const token = getState().user.token;
    const recipesAmount =
      getState().recipes.recipes.length === null
        ? 0
        : getState().recipes.recipes.length;

    if (
      recipesAmount >= getState().recipes.recipesCount &&
      getState().recipes.recipesCount !== null
    ) {
      return;
    }

    try {
      const response = await recipeApi.get(
        `/recipes?limit=3&offset=${recipesAmount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("RESPONSE", response.data);

      dispatch(storeRecipes(response.data));
      dispatch(appDoneLoading());
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
      // const recipeState = getState().recipes.recipes;
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeRecipeThunk = (
  id,
  title,
  description,
  stepsArray,
  cookingTime,
  category,
  ingredientsArray,
  photo,
  is_public,
  recipeId
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    dispatch;
    const response = await recipeApi.patch(
      "/recipes",
      {
        id,
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
    dispatch(getUserCategories());
    dispatch(getRecipeDetails(recipeId));
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
      // console.log("RESPONSE", response.data);
      dispatch(storeCategories(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

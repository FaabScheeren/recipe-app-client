import recipeApi from "../../config/api";

const storeRecipe = (recipe) => {
  return {
    type: "add_recipes",
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
      console.log("RESPONSE", response);

      dispatch(storeRecipe(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

import recipeApi from "../../config/api";

export const loginSucces = (data) => {
  return {
    type: "login",
    payload: data,
  };
};

const signupThunk = (firstName, lastName, email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await recipeApi.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
      dispatch(loginSucces(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

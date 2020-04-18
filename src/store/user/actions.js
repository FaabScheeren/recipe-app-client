import recipeApi from "../../config/api";
import { AsyncStorage } from "react-native";

const loginSucces = (data) => {
  return {
    type: "login",
    payload: data,
  };
};

const setToken = (data) => {
  return {
    type: "storeToken",
    payload: data,
  };
};

export const signupThunk = (firstName, lastName, email, password) => {
  return async (dispatch, getState) => {
    // console.log("Data in thunk", firstName, lastName, email, password);
    try {
      const response = await recipeApi.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      // console.log(response);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(loginSucces(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loginThunk = (email, password) => {
  return async (dispatch, getState) => {
    // console.log("Data in thunk / login:", email, password);

    try {
      const response = await recipeApi.post("/login", {
        email,
        password,
      });
      // console.log("RESPONSE login:", response);

      AsyncStorage.setItem("token", response.data.token);
      dispatch(loginSucces(response.data));
      const state = getState();
      // console.log("THIS IS THE STATE:", state.user.token);
    } catch (e) {
      console.log(e);
    }
  };
};

export const tryLocalLogin = () => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return;
    } else {
      const response = await recipeApi.get("/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response local login", response.data);
      const userWithToken = { ...response.data, token };
      console.log("User with token", userWithToken);
      dispatch(loginSucces(userWithToken));
    }
  };
};

import recipeApi from "../../config/api";
import { AsyncStorage } from "react-native";
import { appLoading, appDoneLoading } from "../appState/actions";

const loginSucces = (data) => {
  return {
    type: "login",
    payload: data,
  };
};

export const signupThunk = (firstName, lastName, email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await recipeApi.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      await AsyncStorage.setItem("token", response.data.token);
      dispatch(loginSucces(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loginThunk = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await recipeApi.post("/login", {
        email,
        password,
      });

      AsyncStorage.setItem("token", response.data.token);
      dispatch(loginSucces(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const tryLocalLogin = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return;
    } else {
      const response = await recipeApi.get("/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userWithToken = { ...response.data, token };
      dispatch(loginSucces(userWithToken));
      dispatch(appDoneLoading());
    }
  };
};

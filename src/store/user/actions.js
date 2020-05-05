import recipeApi from "../../config/api";
import { AsyncStorage } from "react-native";
import {
  appLoading,
  appDoneLoading,
  setMessage,
  clearMessage,
} from "../appState/actions";

const signinSucces = (data) => {
  return {
    type: "signin",
    payload: data,
  };
};

const signout = () => {
  return {
    type: "signout",
  };
};

const storeUserCategories = (categories) => {
  return {
    type: "add_user_categories",
    payload: categories,
  };
};

export const signupThunk = (firstName, lastName, email, password) => {
  return async (dispatch, getState) => {
    dispatch(clearMessage());
    try {
      const response = await recipeApi.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      await AsyncStorage.setItem("token", response.data.token);
      dispatch(signinSucces(response.data));
    } catch (e) {
      dispatch(setMessage(e.response.data));
    }
  };
};

export const signinThunk = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(clearMessage());
    try {
      const response = await recipeApi.post("/signin", {
        email,
        password,
      });
      AsyncStorage.setItem("token", response.data.token);
      dispatch(signinSucces(response.data));
    } catch (e) {
      dispatch(setMessage(e.response.data));
    }
    dispatch(appDoneLoading());
  };
};

export const signoutThunk = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    await AsyncStorage.removeItem("token");
    dispatch(signout());
    dispatch(appDoneLoading());
  };
};

export const getUserCategories = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    try {
      const response = await recipeApi.get("/user-categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);
      dispatch(storeUserCategories(response.data));
      // const recipeState = getState().user;
      // console.log("Recipe state after categorie", recipeState);
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
      dispatch(appDoneLoading());
    } else {
      const response = await recipeApi.get("/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userWithToken = { ...response.data, token };
      dispatch(appDoneLoading());
      dispatch(signinSucces(userWithToken));
    }
  };
};

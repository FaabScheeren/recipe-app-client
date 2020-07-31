// This is a check
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
// storeProfileImage
const storeProfileImage = (url) => {
  return {
    type: "store_profile_image",
    payload: url,
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
      console.log(e);
      dispatch(setMessage(e.response.data));
      const state = getState().appState;
      console.log("State in thunk", state);
    }
  };
};

export const signinThunk = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(clearMessage());
    try {
      // const response = await recipeApi.post("/signin", {
      const response = await recipeApi.post("/signin", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(signinSucces(response.data));
    } catch (e) {
      dispatch(setMessage(e.response.data));
      const state = getState().appState;
      console.log("State in thunk", state);
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

      dispatch(storeUserCategories(response.data));
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

export const saveProfileImage = (imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    try {
      const response = await recipeApi.patch(
        "/save-profile-image",
        {
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(storeProfileImage(response.data.userImage));
      // const recipeState = getState().recipes.recipes;
    } catch (e) {
      console.log(e);
    }
  };
};

import { AsyncStorage } from "react-native";

const initialState = {};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      AsyncStorage.setItem(payload.token);
      return action.payload;
    default:
      return state;
  }
};

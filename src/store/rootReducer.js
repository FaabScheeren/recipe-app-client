import { combineReducers } from "redux";
import user from "./user/reducer";
import recipes from "./recipes/reducer";
import appState from "./appState/reducer";

export default rootReducer = combineReducers({ user, recipes, appState });

import { combineReducers } from "redux";
import user from "./user/reducer";
import recipes from "./recipes/reducer";

const rootReducer = combineReducers(user);

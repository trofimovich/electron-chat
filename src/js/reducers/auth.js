import { combineReducers } from "redux";
import { createErrorReducer, createIsFetchingReducer } from "./common";

const createLoginReducer = () => {
  return combineReducers({
    isChecking: createIsFetchingReducer("AUTH_LOGIN"),
    error: createErrorReducer("AUTH_LOGIN"),
  });
};

const createRegisterReducer = () => {
  return combineReducers({
    isChecking: createIsFetchingReducer("AUTH_REGISTER"),
    error: createErrorReducer("AUTH_REGISTER"),
  });
};

const createAuthReducer = () => {
  const user = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_INIT":
      case "AUTH_ON_ERROR":
        return null;
      case "AUTH_ON_SUCCESS":
      case "AUTH_LOGIN_SUCCESS":
      case "AUTH_REGISTER_SUCCESS":
        return action.user;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking: createIsFetchingReducer("AUTH_ON"),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
};

export default createAuthReducer();

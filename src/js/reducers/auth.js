import { combineReducers } from "redux";

const createAuthReducer = () => {
  const user = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_INIT":
      case "AUTH_ON_ERROR":
        return null;
      case "AUTH_ON_SUCCESS":
        return action.user;
      default:
        return state;
    }
  };

  const isChecking = (state = false, action) => {
    switch (action.type) {
      case "AUTH_ON_INIT":
      case "AUTH_LOGIN_INIT":
      case "AUTH_REGISTER_INIT":
      case "AUTH_LOGOUT_INIT":
        return true;
      case "AUTH_LOGOUT_SUCCESS":
      case "AUTH_ON_SUCCESS":
      case "AUTH_ON_ERROR":
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking,
  });
};

export default createAuthReducer();

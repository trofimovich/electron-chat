import React from "react";
import { Provider } from "react-redux";
import configureStore from ".";

const StoreProvider = ({ children }) => {
  const store = configureStore();
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;

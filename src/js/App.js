import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import configureStore from "./store";

import HomeView from "./views/Home";
import RegisterView from "./views/Register";
import LoginView from "./views/Login";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";

import Navbar from "./components/Navbar";

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Router>
        <div className="content-wrapper">
          <Switch>
            <Route path="/settings">
              <SettingsView />
            </Route>
            <Route path="/login">
              <LoginView />
            </Route>
            <Route path="/register">
              <RegisterView />
            </Route>
            <Route path="/chat/:id">
              <ChatView />
            </Route>
            <Route path="/" exact>
              <HomeView />
            </Route>
          </Switch>
        </div>
        <Navbar />
      </Router>
    </Provider>
  );
};

export default App;

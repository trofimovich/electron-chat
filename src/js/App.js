import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import configureStore from "./store";
import { listenToAuthChanges } from "./actions/auth";

import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";

import Navbar from "./components/Navbar";

const App = () => {
  const store = configureStore();
  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="content-wrapper">
          <Switch>
            <Route path="/" exact>
              <WelcomeView />
            </Route>
            <Route path="/home">
              <HomeView />
            </Route>
            <Route path="/settings">
              <SettingsView />
            </Route>
            <Route path="/chat/:id">
              <ChatView />
            </Route>
          </Switch>
        </div>
        <Navbar />
      </Router>
    </Provider>
  );
};

export default App;

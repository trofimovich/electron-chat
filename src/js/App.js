import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./views/Home";
import RegisterView from "./views/Register";
import LoginView from "./views/Login";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";

import Navbar from "./components/Navbar";

const App = () => {
  return (
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
          <Route path="/chat">
            <ChatView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </div>
      <Navbar />
    </Router>
  );
};

export default App;

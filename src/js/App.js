import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomeView from "./views/Home";

const App = () => {
  return (
    <Router>
      <div className="content-wrapper">
        <Switch>
          <Route path="/settings">
            <h1>Settings View</h1>
          </Route>
          <Route path="/login">
            <h1>Login View</h1>
          </Route>
          <Route path="/register">
            <h1>Register View</h1>
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

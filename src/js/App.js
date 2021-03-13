import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import { listenToAuthChanges } from "./actions/auth";

import StoreProvider from "./store/StoreProvider";
import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";

import Navbar from "./components/Navbar";
import LoadingView from "./components/shared/LoadingView";

const ContentWrapper = ({ children }) => (
  <div className="content-wrapper">{children}</div>
);

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);
  const onlyChild = React.Children.only(children);
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route path="/" exact>
            <WelcomeView />
          </Route>
          <AuthRoute path="/home">
            <HomeView />
          </AuthRoute>
          <AuthRoute path="/settings">
            <SettingsView />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <ChatView />
          </AuthRoute>
        </Switch>
      </ContentWrapper>
      <Navbar />
    </Router>
  );
};

const App = () => (
  <StoreProvider>
    <ChatApp />
  </StoreProvider>
);

export default App;

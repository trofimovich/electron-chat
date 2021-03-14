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

import LoadingView from "./components/shared/LoadingView";
import { listenToConnectionChanges } from "./actions/app";

const ContentWrapper = ({ children }) => (
  <div className="content-wrapper">{children}</div>
);

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);
  const onlyChild = React.Children.only(children);
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
  const isOnline = useSelector(({ app }) => app.isOnline);
  useEffect(() => {
    const unsubscribeFromAuth = dispatch(listenToAuthChanges());
    const unsubscribeFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubscribeFromAuth();
      unsubscribeFromConnection();
    };
  }, [dispatch]);

  if (!isOnline) {
    return (
      <LoadingView message="Application has been disconnected from the internet. Please reconnect" />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <ContentWrapper>
        {isOnline.toString()}
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
    </Router>
  );
};

const App = () => (
  <StoreProvider>
    <ChatApp />
  </StoreProvider>
);

export default App;

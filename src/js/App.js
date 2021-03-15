import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { listenToAuthChanges } from "./actions/auth";

import StoreProvider from "./store/StoreProvider";
import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";
import ChatCreate from "./views/ChatCreate";

import LoadingView from "./components/shared/LoadingView";
import { listenToConnectionChanges } from "./actions/app";
import { checkUserConnection } from "./actions/connection";

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
  const user = useSelector(({ auth }) => auth.user);
  useEffect(() => {
    const unsubscribeFromAuth = dispatch(listenToAuthChanges());
    const unsubscribeFromConnection = dispatch(listenToConnectionChanges());
    const unsubscribeFromUserConnection = dispatch(checkUserConnection());

    return () => {
      unsubscribeFromAuth();
      unsubscribeFromConnection();
      unsubscribeFromUserConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubscribeFromUserConnection;
    if (user?.uid) {
      unsubscribeFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubscribeFromUserConnection && unsubscribeFromUserConnection();
    };
  });

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
          <AuthRoute path="/chatCreate">
            <ChatCreate />
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

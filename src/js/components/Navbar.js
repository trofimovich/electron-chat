import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../actions/auth";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button
            className="btn btn-outline-primary"
            onClick={() => history.goBack()}
          >
            Back
          </button>
          <button
            onClick={() => history.push("/settings")}
            className="btn btn-outline-success ml-2"
          >
            Settings
          </button>
        </div>
        <div className="chat-navbar-inner-right">
          <button
            onClick={() => history.push("/")}
            className="btn btn-outline-success ml-2 mr-2"
          >
            Login
          </button>
          {user && (
            <>
              <img className="avatar mr-2" src={user.avatar}></img>
              <span className="logged-in-user">Hi, {user.username}</span>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-outline-danger ml-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

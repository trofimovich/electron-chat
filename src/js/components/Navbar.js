import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="chat-navbar">
    <nav className="chat-navbar-inner">
      <div className="chat-navbar-inner-left">
        <Link to="/settings" className="btn btn-outline-success ml-2">
          Settings
        </Link>
      </div>
      <div className="chat-navbar-inner-right">
        <span className="logged-in-user">Hi User</span>
        <Link
          to="/register"
          onClick={() => {}}
          className="btn btn-sm btn-outline-danger ml-2"
        >
          Register
        </Link>
        <Link
          to="/login"
          onClick={() => {}}
          className="btn btn-sm btn-outline-success ml-2"
        >
          Login
        </Link>
      </div>
    </nav>
  </div>
);

export default Navbar;

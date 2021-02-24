import React from "react";
import { Link } from "react-router-dom";

const ViewTitle = () => (
  <div className="chat-name-container">
    <span className="name">Choose your channel</span>
    <Link to="/" className="btn btn-primary btn-sm back-button">
      Back
    </Link>
  </div>
);

export default ViewTitle;

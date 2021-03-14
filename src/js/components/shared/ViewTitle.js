import React from "react";

const ViewTitle = ({ children, text }) => (
  <div className="chat-name-container">
    <span className="name">{text}</span>
    <div>{children}</div>
  </div>
);

export default ViewTitle;

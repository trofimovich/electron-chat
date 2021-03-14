import React from "react";
import Navbar from "../components/Navbar";

const BaseLayout = ({ children, ...props }) => {
  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  );
};

const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

export const withBaseLayout = (Component, config) => {
  return (props) => {
    const viewName = getDisplayName(Component);
    return (
      <>
        <Navbar {...config} view={viewName} />
        <Component {...props} />
      </>
    );
  };
};

export default BaseLayout;

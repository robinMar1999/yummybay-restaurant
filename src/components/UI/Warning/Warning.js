import React from "react";
import classes from "./Warning.module.css";
const Warning = (props) => {
  return <div className={classes.Warning}>{props.children}</div>;
};
export default Warning;

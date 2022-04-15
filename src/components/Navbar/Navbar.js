import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/update-profile"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        Update Profile
      </NavLink>
      <NavLink
        to="/dishes"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        Dishes
      </NavLink>
      <button onClick={props.logoutClick}>Logout</button>
    </div>
  );
};
export default Navbar;

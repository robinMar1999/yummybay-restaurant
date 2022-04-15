import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop clicked={props.closeModal} />
      <div className={classes.Modal}>{props.children}</div>
    </Fragment>
  );
};
export default Modal;

import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const classNameBtn = `${props.className} ${classes.button}`;
  return (
    <button
      className={classNameBtn}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

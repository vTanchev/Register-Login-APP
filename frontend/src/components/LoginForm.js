import React from "react";
import { Link } from "react-router-dom";

import useInput from "../hooks/use-input";

import Button from "../UI/Button";
import Card from "../UI/Card";

import { BsFillPersonFill, BsUnlockFill } from "react-icons/bs";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const {
    value: enteredName,
    isValid: valueIsValid,
    hasError: nameInputError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "" && value.length >= 6);

  let formIsValid = false;
  if (valueIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredName, enteredPassword);
    resetInput();
    resetPassword();
  };

  const nameInputClass = nameInputError
    ? `${classes.wrap} ${classes["error-text"]} ${classes.invalid}`
    : `${classes.wrap}`;

  const passwordInputClass = passwordInputError
    ? `${classes.wrap} ${classes["error-text"]} ${classes.invalid}`
    : `${classes.wrap}`;

  return (
    <Card>
      <h4 className={classes.title}>Login</h4>
      <form onSubmit={formSubmitHandler}>
        <div className={nameInputClass}>
          <label htmlFor="username">Username</label>
          <div className={classes.input}>
            <span>
              <BsFillPersonFill style={{ color: "#bbbbbb" }} />
            </span>
            <input
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              type="username"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          {nameInputError && <p>Enter valid username</p>}
        </div>
        <div className={passwordInputClass}>
          <label htmlFor="password">Password</label>
          <div className={classes.input}>
            <span>
              <BsUnlockFill style={{ color: "#bbbbbb" }} />
            </span>
            <input
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          {passwordInputError && <p>Enter valid password</p>}
          <p className={classes.paragraph}>Forgot password?</p>
        </div>

        <>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </>
        <div className={classes.signup}>
          <p>Or Sign Up Using</p>
          <Link to="/register">SIGN UP</Link>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;

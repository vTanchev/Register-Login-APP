import React, { useState } from "react";
import { Link } from "react-router-dom";

import useInput from "../hooks/use-input";

import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./RegisterForm.module.css";
import { BsFillPersonFill, BsUnlockFill } from "react-icons/bs";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) =>
  value.trim() !== "" && value.length >= 6 && value.length <= 16;

const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkBoxHadneler = () => {
    setIsChecked((prevValue) => !prevValue);
  };

  // user
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);
  // mail
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);
  // pw
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isPassword);
  // confrm pw
  const {
    value: enteredConfirmPassword,

    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: resetPasswordConfirmInput,
  } = useInput(isPassword);

  let correctPassword = false;

  if (!passwordInputError && enteredPassword === enteredConfirmPassword) {
    correctPassword = true;
  }

  let formIsValid = false;
  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    correctPassword &&
    isChecked
  ) {
    formIsValid = true;
  }

  const formRegisterHandler = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "applicatin/json",
      },
      body: JSON.stringify({
        enteredName,
        enteredEmail,
        enteredPassword,
      }),
    });

    const data = await response.json();
    console.log(data);

    // reset
    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetPasswordConfirmInput();
    setIsChecked(false);
  };

  const userNameInputClass = nameInputError
    ? `${classes.wrap} ${classes["error-text"]} ${classes.invalid}`
    : `${classes.wrap}`;

  const emailInputClass = emailInputError
    ? `${classes.wrap} ${classes["error-text"]} ${classes.invalid}`
    : `${classes.wrap}`;

  const passwordInputClass = passwordInputError
    ? `${classes.wrap} ${classes["error-text"]}`
    : `${classes.wrap}`;

  const correctPasswordInputClass = !correctPassword
    ? `${classes.wrap} ${classes["error-text"]} ${classes.invalid}`
    : `${classes.wrap}`;

  return (
    <Card>
      <h4 className={classes.title}>Sign up</h4>
      <form onSubmit={formRegisterHandler}>
        <div className={userNameInputClass}>
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
        <div className={emailInputClass}>
          <label htmlFor="username">Email</label>
          <div className={classes.input}>
            <span>
              <BsFillPersonFill style={{ color: "#bbbbbb" }} />
            </span>
            <input
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              type="text"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          {emailInputError && <p>Enter valid email</p>}
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
              id="password1"
              placeholder="Enter your password"
            />
          </div>
          {passwordInputError && <p>Password should be 6-20 characters</p>}
        </div>
        <div className={correctPasswordInputClass}>
          <label htmlFor="password">Confirm Password</label>
          <div className={classes.input}>
            <span>
              <BsUnlockFill style={{ color: "#bbbbbb" }} />
            </span>
            <input
              value={enteredConfirmPassword}
              onChange={passwordConfirmChangeHandler}
              onBlur={passwordConfirmBlurHandler}
              type="password"
              id="password2"
              placeholder="Confirm Password"
            />
          </div>
          {!correctPassword && <p>Passwords don't match!</p>}
        </div>
        <div className={classes.statements}>
          <input
            type="checkbox"
            id="agree"
            name="agree"
            value="agree"
            checked={isChecked}
            onChange={checkBoxHadneler}
          />
          <label htmlFor="agree">
            I agree all statements in <span>Terms of service</span>
          </label>
        </div>
        <>
          <Button type="submit" disabled={!formIsValid}>
            Register
          </Button>
        </>
        <div className={classes.signup}>
          <p>Already have account?</p>
          <Link to="/">SIGN IN</Link>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;

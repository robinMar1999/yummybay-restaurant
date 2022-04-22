import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Auth.module.css";
import axios from "axios";

let interval = null;

const Auth = (props) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [tempToken, setTempToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const emailRef = useRef();
  const otpRef = useRef();

  const sendFormHandler = (e) => {
    e.preventDefault();
    setIsSendingOtp(true);
    const email = emailRef.current.value;
    axios
      .post("/auth/getotp", {
        email,
        role: "restaurant",
      })
      .then((response) => {
        setIsOtpSent(true);
        setIsSendingOtp(false);
        setTempToken(response.data.token);
        interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev == 1) {
              clearInterval(interval);
              return 0;
            } else {
              return prev - 1;
            }
          });
        }, 1000);
      })
      .catch((err) => {
        setIsSendingOtp(false);
        console.log(err);
      });
  };
  const verifyFormHandler = (e) => {
    // Work left: send axios request and get response.
    const otp = otpRef.current.value;
    e.preventDefault();
    axios({
      method: "post",
      url: "/auth/verify",
      data: {
        otp,
        enteredAt: new Date(),
      },
      headers: {
        Authorization: tempToken,
      },
    })
      .then((res) => {
        clearInterval(interval);
        setIsVerified(true);
        setMsg("Phone number verified successfully");
        props.login(res.data.token, res.data.isProfileAdded);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.Auth}>
      <h1>Welcome to YummyBay partners</h1>
      {!isOtpSent && (
        <form onSubmit={sendFormHandler} className={classes.Form}>
          {isSendingOtp && (
            <div className={classes.Loading}>Sending Otp...</div>
          )}
          <div className={classes.FormControl}>
            <label htmlFor="email" className={classes.Label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              className={classes.Input}
            />
          </div>

          <button type="submit" className={classes.Button}>
            Submit
          </button>
        </form>
      )}
      {isOtpSent && (
        <Fragment>
          <form onSubmit={verifyFormHandler} className={classes.Form}>
            <div className={classes.FormControl}>
              <label htmlFor="otp" className={classes.Label}>
                Enter the Otp:{" "}
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                ref={otpRef}
                className={classes.Input}
              />
            </div>

            <button type="submit" className={classes.Button}>
              Submit
            </button>
          </form>
          {!isVerified && <p>{timeLeft} seconds left.</p>}
          {isVerified && <p>{msg}</p>}
        </Fragment>
      )}
    </div>
  );
};
export default Auth;

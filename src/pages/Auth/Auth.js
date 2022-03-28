import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Auth.module.css";
import axios from "axios";

let interval = null;

const Auth = (props) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [tempToken, setTempToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const emailRef = useRef();
  const roleRef = useRef();
  const otpRef = useRef();

  const sendFormHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const role = roleRef.current.value;
    axios
      .post("/auth/getotp", {
        email,
        role,
      })
      .then((response) => {
        setIsOtpSent(true);
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
        props.setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.Auth}>
      <h1>Welcome to YummyBay partners</h1>
      {!isOtpSent && (
        <form onSubmit={sendFormHandler}>
          <label htmlFor="role">Role</label>
          <select name="role" id="role" ref={roleRef}>
            <option value="restaurant">Restaurant</option>
            <option value="delivery">Delivery</option>
          </select>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
          <button type="submit">Submit</button>
        </form>
      )}
      {isOtpSent && (
        <Fragment>
          <form onSubmit={verifyFormHandler}>
            <label htmlFor="otp">Enter the Otp: </label>
            <input type="text" name="otp" id="otp" ref={otpRef} />
            <button type="submit">Submit</button>
          </form>
          {!isVerified && <p>{timeLeft} seconds left.</p>}
          {isVerified && <p>{msg}</p>}
        </Fragment>
      )}
    </div>
  );
};
export default Auth;

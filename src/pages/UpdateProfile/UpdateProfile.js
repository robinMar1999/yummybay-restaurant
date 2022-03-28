import React, { useEffect, useRef, useState } from "react";
import classes from "./UpdateProfile.module.css";
import axios from "axios";

const UpdateProfile = (props) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const photoRef = useRef();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err.code, err.message);
      }
    );
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const photo = photoRef.current.files[0];
    const data = new FormData();
    data.append("name", name);
    data.append("address", address);
    data.append("phone", phone);
    data.append("photo", photo);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    axios({
      method: "post",
      url: "/restaurant/profile",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <div className={classes.UpdateProfile}>
      <h1>Update Your Profile</h1>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="name">Name of Restaurant: </label>
        <input type="text" name="name" id="name" ref={nameRef} />
        <label htmlFor="address">Address: </label>
        <input type="text" name="address" id="address" ref={addressRef} />
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input type="tel" name="phoneNumber" id="phoneNumber" ref={phoneRef} />
        <label htmlFor="photo">Photo: </label>
        <input type="file" name="photo" id="photo" ref={photoRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default UpdateProfile;

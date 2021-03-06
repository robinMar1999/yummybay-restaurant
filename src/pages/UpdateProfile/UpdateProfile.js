import React, { useRef, useState } from "react";
import classes from "./UpdateProfile.module.css";
import axios from "axios";

const UpdateProfile = (props) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const photoRef = useRef();
  const [isAdding, setIsAdding] = useState(false);
  const [addingPhoto, setAddingPhoto] = useState(false);
  const [addingPhotoError, setAddingPhotoError] = useState(false);
  const [addingError, setAddingError] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    // const photo = photoRef.current.files[0];
    const data = new FormData();
    data.append("name", name);
    data.append("address", address);
    data.append("phone", phone);
    axios({
      method: "patch",
      url: "/restaurant/profile",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        setIsAdding(false);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        setAddingError(true);
        console.log(response);
      });
  };

  const photoSubmitHandler = async (e) => {
    e.preventDefault();
    setAddingPhoto(true);
    const photo = photoRef.current.files[0];
    const data = new FormData();
    data.append("photo", photo);
    axios({
      method: "patch",
      url: "/restaurant/profile/photo",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        setAddingPhoto(false);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        setAddingPhotoError(true);
        console.log(response);
      });
  };

  const content = addingError ? "Some Error Occurred" : "Updating Profile...";

  const photoContent = addingPhotoError
    ? "Some Error Occurred"
    : "Updating Profile Picture...";

  return (
    <div className={classes.UpdateProfile}>
      <h1>Update Your Profile</h1>
      <form onSubmit={formSubmitHandler} className={classes.Form}>
        {isAdding && <div className={classes.isAdding}>{content}</div>}
        <div className={classes.FormControl}>
          <label htmlFor="name">Name of Restaurant: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="address">Address: </label>
          <input type="text" name="address" id="address" ref={addressRef} />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            ref={phoneRef}
          />
        </div>
        <div className={classes.FormControl}>
          <button type="submit">Submit</button>
        </div>
      </form>

      <form onSubmit={photoSubmitHandler} className={classes.Form}>
        {addingPhoto && <div className={classes.isAdding}>{photoContent}</div>}
        <div className={classes.FormControl}>
          <label htmlFor="photo">Photo: </label>
          <input type="file" name="photo" id="photo" ref={photoRef} />
        </div>
        <div className={classes.FormControl}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UpdateProfile;

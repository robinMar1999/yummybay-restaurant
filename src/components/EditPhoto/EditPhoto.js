import React, { useRef, useState } from "react";
import axios from "axios";
import classes from "./EditPhoto.module.css";

const EditPhoto = (props) => {
  const imageRef = useRef();

  const [adding, setAdding] = useState(false);

  const addDishHandler = (e) => {
    e.preventDefault();
    setAdding(true);
    const image = imageRef.current.files[0];
    const formData = new FormData();
    formData.append("photo", image);
    axios({
      method: "patch",
      url: "/restaurant/dish/" + props.id + "/photo",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then((res) => {
        setAdding(false);
        props.updateInDishes(res.data.dish);
        console.log(res);
      })
      .catch((err) => {
        //handle error
        console.log(err);
      });
  };

  return (
    <div className={classes.EditPhoto}>
      <h1>Add new photo</h1>
      <form onSubmit={addDishHandler} className={classes.Form}>
        {adding && <div className={classes.Loading}>Adding New Dish...</div>}
        <div className={classes.FormControl}>
          <label htmlFor="image">Image: </label>
          <input type="file" name="image" id="image" ref={imageRef} />
        </div>
        <div className={classes.FormControl}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default EditPhoto;

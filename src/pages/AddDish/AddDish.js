import React, { useRef } from "react";
import axios from "axios";
import classes from "./AddDish.module.css";
import { useNavigate } from "react-router-dom";

const AddDish = (props) => {
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  const navigate = useNavigate();
  const addDishHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const image = imageRef.current.files[0];
    console.log(name, price, image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("photo", image);
    axios({
      method: "post",
      url: "/restaurant/dish",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        navigate("/");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        alert("some error occurred");
      });
  };

  return (
    <div className={classes.AddDish}>
      <h1>Add Dish here</h1>
      <form onSubmit={addDishHandler}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" ref={nameRef} />
        <label htmlFor="price">Price: </label>
        <input type="number" name="price" id="price" ref={priceRef} />
        <label htmlFor="image">Image: </label>
        <input type="file" name="image" id="image" ref={imageRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddDish;

// price
// category
// type
// image
// description

import React, { useRef, useState } from "react";
import axios from "axios";
import classes from "./EditDish.module.css";

const AddDish = (props) => {
  const nameRef = useRef();
  const priceRef = useRef();

  const [adding, setAdding] = useState(false);

  const addDishHandler = (e) => {
    e.preventDefault();
    setAdding(true);
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    axios({
      method: "patch",
      url: "/restaurant/dish/" + props.id,
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
    <div className={classes.AddDish}>
      <h1>Edit Dish here</h1>
      <form onSubmit={addDishHandler} className={classes.Form}>
        {adding && <div className={classes.Loading}>Updating Dish...</div>}
        <div className={classes.FormControl}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" id="price" ref={priceRef} />
        </div>
        <div className={classes.FormControl}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AddDish;

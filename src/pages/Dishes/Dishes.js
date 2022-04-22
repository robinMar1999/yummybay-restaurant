import React, { useEffect, useState } from "react";
import classes from "./Dishes.module.css";
import AddDish from "../../components/AddDish/AddDish";
import Modal from "../../components/UI/Modal/Modal";
import EditDish from "../../components/EditDish/EditDish";
import axios from "axios";
import EditPhoto from "../../components/EditPhoto/EditPhoto";
const Dishes = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [error, setError] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/restaurant/dish",
      headers: {
        Authorization: props.token,
      },
    })
      .then((res) => {
        console.log(res);
        setLoadingDishes(false);
        setError(false);
        setDishes(res.data.dishes);
      })
      .catch((err) => {
        console.log(err);
        setLoadingDishes(false);
        setError(true);
      });
  }, []);

  const addToDishes = (dish) => {
    closeModal();
    setDishes((prevDishes) => {
      return [...prevDishes, dish];
    });
  };

  const updateInDishes = (dish) => {
    closeModal();
    setDishes((prevDishes) => {
      const newDishes = [];
      prevDishes.forEach((prevDish) => {
        if (prevDish._id === dish._id) {
          newDishes.push(dish);
        } else {
          newDishes.push(prevDish);
        }
      });
      return newDishes;
    });
  };

  const openAddDishForm = () => {
    setShowModal(true);
    setAdding(true);
  };

  const openEditDishForm = (id) => {
    setShowModal(true);
    setEditing(true);
    setEditingId(id);
  };

  const openEditPhotoForm = (id) => {
    setShowModal(true);
    setEditingPhoto(true);
    setEditingId(id);
  };

  const deleteDishHandler = (id) => {
    // do some work here
  };

  const closeModal = () => {
    setShowModal(false);
    setAdding(false);
    setEditing(false);
    setEditingId(null);
    setEditingPhoto(false);
  };

  let modalContent = null;
  if (adding) {
    modalContent = <AddDish token={props.token} addToDishes={addToDishes} />;
  }

  if (editing) {
    modalContent = (
      <EditDish
        id={editingId}
        token={props.token}
        updateInDishes={updateInDishes}
      />
    );
  }

  if (editingPhoto) {
    modalContent = (
      <EditPhoto
        id={editingId}
        token={props.token}
        updateInDishes={updateInDishes}
      />
    );
  }

  const dishList = [];

  dishes.forEach((dish) => {
    dishList.push(
      <div key={dish._id} className={classes.DishItem}>
        <div className={classes.Name}>{dish.name}</div>
        <div className={classes.Price}>₹ {dish.price}</div>
        <div className={classes.Image}>
          <div
            className={classes.EditImageButton}
            onClick={() => {
              openEditPhotoForm(dish._id);
            }}
          >
            + New Photo
          </div>
          <img src={dish.imageDetails.url} alt={dish.name} />
        </div>
        <div className={classes.ButtonGroup}>
          <button
            className={classes.EditBtn}
            onClick={() => {
              openEditDishForm(dish._id);
            }}
          >
            Edit
          </button>
          <button
            className={classes.DeleteBtn}
            onClick={() => {
              deleteDishHandler(dish._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.Dishes}>
      {showModal && <Modal closeModal={closeModal}>{modalContent}</Modal>}
      <h1>Your Dishes</h1>
      {loadingDishes && <div>Loading Dishes...</div>}
      {error && <div>Some Error Occurred</div>}
      {!loadingDishes && !error && (
        <div className={classes.DishList}>{dishList}</div>
      )}
      <button className={classes.AddDishButton} onClick={openAddDishForm}>
        +
      </button>
    </div>
  );
};
export default Dishes;

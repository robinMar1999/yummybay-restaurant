import React, { Fragment, useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";

const Dashboard = (props) => {
  const [areActive, setAreActive] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showOrder, setShowOrder] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "restaurant/order",
      headers: {
        Authorization: props.token,
      },
    })
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
        alert("some error occurred");
      });
  }, []);

  const orderHandHandler = (id) => {
    axios.patch(`/restaurant/hand/${id}`).then((res) => {
      const newOrder = res.data.order;
      console.log(newOrder);
      setOrders((prevOrders) => {
        const newOrders = [];
        for (let order of prevOrders) {
          if (order._id !== newOrder._id) {
            newOrders.push(order);
          } else {
            newOrders.push(newOrder);
          }
        }
        return newOrders;
      });
    });
  };

  const showModal = (order) => {
    setShowOrder(order);
  };

  const activeItems = [];
  const handedItems = [];
  orders.forEach((order) => {
    if (order.status >= 1) {
      handedItems.push(
        <div className={classes.orderItem} key={order._id}>
          <div className={classes.DatePrice}>
            <div className={classes.Date}>
              <strong>Ordered At: </strong>
              {new Date(order.createdAt).toLocaleString()}
            </div>

            <div className={classes.Price}>
              Total Price: ₹ {order.totalPrice}
            </div>
          </div>
          <div className={classes.SeeDetails}>
            <button onClick={() => showModal(order)}>See Details</button>
          </div>
        </div>
      );
    } else {
      activeItems.push(
        <div className={classes.orderItem} key={order._id}>
          <div className={classes.DatePrice}>
            <div className={classes.Date}>
              <strong>Ordered At: </strong>
              {new Date(order.createdAt).toLocaleString()}
            </div>

            <div className={classes.Price}>
              Total Price: ₹ {order.totalPrice}
            </div>
          </div>
          <div className={classes.SeeDetails}>
            <button onClick={() => showModal(order)}>See Details</button>
          </div>
          <button
            className={classes.DeliveryButton}
            disabled={order.status >= 1 || !order.delivery}
            onClick={() => orderHandHandler(order._id)}
          >
            {!order.delivery && "Delivery Not available Yet"}
            {order.delivery && order.status === 0 && "Hand"}
            {order.status >= 1 && "Handed"}
          </button>
        </div>
      );
    }
  });

  const switchToActive = () => {
    setAreActive(true);
  };
  const switchToHanded = () => {
    setAreActive(false);
  };

  const closeModal = () => {
    setShowOrder(null);
  };

  const showOrderContent = showOrder ? (
    <Modal closeModal={closeModal}>
      <div className={classes.Dishes}>
        {showOrder.dishes.map((item) => {
          return (
            <div className={classes.Dish} key={item._id}>
              <div className={classes.Count}>{item.count}</div>
              <div className={classes.X}>X</div>
              <div className={classes.DishDetail}>
                <div className={classes.DishName}>{item.dish.name}</div>

                <div className={classes.DishImage}>
                  <img src={item.dish.imageDetails.url} alt={item.dish.name} />
                </div>
                <div className={classes.DishPrice}>₹ {item.dish.price}</div>
                <div className={classes.DishTotal}>
                  = ₹ {item.count * item.dish.price}
                </div>
              </div>
            </div>
          );
        })}
        <div className={classes.TotalPrice}>
          Total Price : ₹ {showOrder.totalPrice}
        </div>
      </div>
    </Modal>
  ) : null;

  return (
    <Fragment>
      {showOrderContent}
      <div className={classes.Dashboard}>
        <h1 className={classes.heading}>Orders</h1>
        <div className={classes.orders}>
          <div className={classes.switchButtons}>
            <button
              onClick={switchToActive}
              className={[
                classes.SwitchButton,
                areActive ? classes.Active : "",
              ].join(" ")}
            >
              Active Orders
            </button>
            <button
              onClick={switchToHanded}
              className={[
                classes.SwitchButton,
                !areActive ? classes.Active : "",
              ].join(" ")}
            >
              Handed Orders
            </button>
          </div>
          {areActive ? activeItems : handedItems}
        </div>
      </div>
    </Fragment>
  );
};
export default Dashboard;

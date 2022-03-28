import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = (props) => {
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/restaurant/dish",
      headers: {
        Authorization: props.token,
      },
    })
      .then((res) => {
        console.log(res.data.dishes);
        setDishes(res.data.dishes);
      })
      .catch((err) => {
        console.log(err);
        alert("some error occurred");
      });
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

  const deleteHandler = (id) => {};

  const editHandler = (id) => {};

  const dishList = [];
  dishes.forEach((dish) => {
    dishList.push(
      <tr key={dish._id} className={classes.row}>
        <td>{dish.name}</td>
        <td>{dish.price}</td>
        <td>
          <img src={dish.imageDetails.url} alt={dish.name} />
        </td>
        <td>
          <button onClick={() => editHandler(dish._id)}>Edit</button>
        </td>
        <td>
          <button onClick={() => deleteHandler(dish._id)}>Delete</button>
        </td>
      </tr>
    );
  });

  const orderList = [];
  orders.forEach((order) => {
    orderList.push(
      <div className={classes.orderItem} key={order._id}>
        <div>
          <strong>Ordered At: </strong>
          {new Date(order.createdAt).toLocaleString()}
        </div>
        <div>
          {order.dishes.map((dish) => {
            return (
              <div key={dish._id}>
                {dish.count} {dish.dish.name}
              </div>
            );
          })}
        </div>
        <div>Total Price: ₹ {order.totalPrice}</div>
        <button>Deliver</button>
      </div>
    );
  });

  return (
    <div className={classes.Dashboard}>
      <h1>Dashboard</h1>
      <div className={classes.dishes}>
        <h1>Your Dishes</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{dishList}</tbody>
        </table>
      </div>
      <div className={classes.orders}>
        <h1>Orders You Have Recieved</h1>
        <div className={classes.orderItems}>{orderList}</div>
      </div>
    </div>
  );
};
export default Dashboard;

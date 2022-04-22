import { Fragment, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import Navbar from "./components/Navbar/Navbar";
import Dishes from "./pages/Dishes/Dishes";
import AddProfile from "./pages/AddProfile/AddProfile";
import Warning from "./components/UI/Warning/Warning";

function App() {
  const [isProfileAdded, setIsProfileAdded] = useState(() => {
    const isProfileAdded = localStorage.getItem("isProfileAdded");
    console.log(isProfileAdded);
    return isProfileAdded === "false" ? false : true;
  });
  const [token, setToken] = useState(() => {
    // getting localstorage value
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  });

  const profileAddedHandler = (value) => {
    localStorage.setItem("isProfileAdded", value);
    setIsProfileAdded(value);
  };

  const loginHandler = (token, isProfileAdded) => {
    setIsProfileAdded(isProfileAdded);
    setToken(token);
    localStorage.setItem("isProfileAdded", isProfileAdded);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    setIsProfileAdded(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isProfileAdded");
  };

  const isLoggedIn = token ? true : false;
  console.log("App.js rendering...");
  console.log("isProfileAdded", isProfileAdded);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="App">
      <Navbar logout={logoutHandler} />
      <Routes>
        {!isLoggedIn && (
          <Route path="/auth" element={<Auth login={loginHandler} />} />
        )}

        {isLoggedIn && !isProfileAdded && (
          <Route
            path="/add-profile"
            element={
              <AddProfile
                token={token}
                setIsProfileAdded={profileAddedHandler}
              />
            }
          />
        )}

        {isLoggedIn && !isProfileAdded && (
          <Route path="/" element={<Navigate to="/add-profile" replace />} />
        )}

        {isLoggedIn && isProfileAdded && (
          <Route path="/" element={<Dashboard token={token} />} />
        )}

        {isLoggedIn && isProfileAdded && (
          <Route
            path="/update-profile"
            element={<UpdateProfile token={token} />}
          />
        )}
        {isLoggedIn && isProfileAdded && (
          <Route path="/dishes" element={<Dishes token={token} />} />
        )}
        {isLoggedIn && isProfileAdded && (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/auth" replace />} />
        )}
        {isLoggedIn && !isProfileAdded && (
          <Route path="*" element={<Navigate to="/add-profile" replace />} />
        )}
      </Routes>
      {isLoggedIn && !isProfileAdded && (
        <Warning>
          <strong>
            You need to create profile before doing anything else!
          </strong>
        </Warning>
      )}
    </div>
  );
}

export default App;

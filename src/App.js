import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import AddDish from "./pages/AddDish/AddDish";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [token, setToken] = useState(() => {
    // getting localstorage value
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  });

  const updateToken = (value) => {
    localStorage.setItem("token", value);
    setToken(value);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  console.log("App.js rendering...");

  const isLoggedIn = token ? true : false;
  return (
    <div className="App">
      <Navbar logoutClick={clearToken} />
      <Routes>
        {!isLoggedIn && (
          <Route path="/auth" element={<Auth setToken={updateToken} />} />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/auth" replace />} />
        )}
        {isLoggedIn && <Route path="/" element={<Dashboard token={token} />} />}
        {isLoggedIn && (
          <Route
            path="/update-profile"
            element={<UpdateProfile token={token} />}
          />
        )}
        {isLoggedIn && (
          <Route path="/add-dish" element={<AddDish token={token} />} />
        )}
        {isLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
      </Routes>
    </div>
  );
}

export default App;

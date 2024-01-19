import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import axios from './utils/axios';
import { setUserDetails } from './redux/usernameSlice';
import AdminLayout from './UserSide/routes/AdminRoute';
import UserLayout from './UserSide/routes/UserRoute';

function App() {
  const [userr, setUserState] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("jwt");
    console.log("Token being sent:", token);
    if (!token) {

      console.log(token, "token no");
    } else {
      axios
        .get('api/verify_token/', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setUserState(response.data.user)
          dispatch(setUserDetails(response.data.user));

        })
        .catch((error) => {
          console.log("Error verifying token:", error);
        });
      }
    },[dispatch]);

    return (
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<UserLayout />} />
      </Routes>

);
}

export default App;

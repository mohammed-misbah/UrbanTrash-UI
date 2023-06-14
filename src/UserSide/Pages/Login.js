// import {FaBars} from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from '../../utils/axios';
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux"
import { loginPost } from '../../utils/constants';
import {setUserDetails} from '../../redux/usernameSlice';
import Navbar from '../Component/Navbar/Navbar';


const Login = () => {
  

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
 
    const data = JSON.stringify({
      email: inputs.email,
      password: inputs.password,
    });
    console.log("your enter a ",inputs.email)
    if (inputs.email === "" || inputs.password === "") {
      Swal.fire("Please fill the components....");
      console.log("your enter a",inputs.password)
    } else {
      axios.post(loginPost, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === "Wrong password" || response.data === "Email or Password is Wrong" || response.data === "no user"|| response.data === 'Password is incorrect') 
          {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Email or Password is incorrect",
              showConfirmButton: false,
              timer: 1500,
            });
          }          else {
            console.log(response.data ,"data responded");
            Cookies.set("jwt", String(response.data.jwt));
            Cookies.set("id", String(response.data.id));
            dispatch(setUserDetails(response.data.user));
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            if (response.status === 200) {
              console.log(response.data);
              navigate("/");
            }
          }
        });
    }
  };
    return (  
        <div>
        <div>
          <Navbar/>
        </div>
        <div className="w-96 bg-green-500 h-96 rounded-lg p-8 mx-auto mt-24">
          <div className="mb-4">
            <h1 className="text-white text-center text-2xl font-bold">Login</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <input
                className="border border-green-200 rounded-lg px-4 py-2 mb-4 text-sm bg-green-200 placeholder-green-500"
                type="text"
                value={inputs.email}
                name="email"
                onChange={handleChange}
                placeholder="username@gmail.com"
              />
              <input
                className="border border-green-200 rounded-lg px-4 py-2 mb-4 text-sm bg-green-200 placeholder-green-500"
                type="password"
                value={inputs.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
              />
              <button className="bg-green-700 hover:bg-green-600 text-white rounded-lg py-2 max-w-md mx-auto" type="submit">Login</button>
              <p className="text-center mt-8">Don't have an account? <a href="/register">Sign in</a></p>
            </div>
          </form>
        </div>
      </div>
      
  );
}
export default Login;





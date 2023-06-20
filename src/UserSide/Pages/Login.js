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
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Footer from '../Component/Footer/Footer';



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
          if (response.data === "Wrong password" || 
          response.data === "Email or Password is Wrong" ||
          response.data === "no user"|| 
          response.data === 'Password is incorrect') 
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
      <section className="bg-gray-200 dark:bg-gray-900">
      <Navbar/>
      <div className="flex flex-col items-center justify-center px-4 py-20 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mt-12">
              Login in to your account
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input value={inputs.email} 
                          onChange={handleChange}
                          type="email" name="email"
                          id="email" 
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700" 
                          placeholder="name@gmai.com"/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" 
                          value={inputs.password}
                          onChange={handleChange}
                          name="password" id="password" 
                          placeholder="••••••••" 
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"/>
                      </div>
                      <div class="flex items-center justify-between">
                          <div class="flex items-start">
                              <div class="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3" />
                              </div>
                              <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          <a href="/otp" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"> Login with OTP </a>
                      </div>
                      <button type="submit" class="w-full text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                        Log in</button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <a href="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
      <Footer/>
    </section>
      
  );
}
export default Login;





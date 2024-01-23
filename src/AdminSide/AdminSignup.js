import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import Swal from "sweetalert2";
import axios from '../utils/axios';
import Cookies from 'js-cookie';


export default function AdminRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(inputs);
     
  if (!inputs.name || !inputs.email || !inputs.phone || !inputs.password) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill in all fields",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (!isValidEmail(inputs.email)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Invalid email address",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (!isValidPhone(inputs.phone)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Invalid phone number",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  console.log(inputs);

    const data = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      password: inputs.password,
    };

    axios
      .post("adminapi/register", data)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        if (response.status === 409) {
          console.log("anybody here");
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Email Already has an Account",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin");
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Already exists",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Already Exists",
          showConfirmButton: true,
          timer: 1500,
        });
      });
  };
  
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  
  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phone);
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-4 py-20 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" style={{ width: '100%', maxWidth: '550px', height: 'auto' }}>
        <div className="p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up in your your Admin
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
              <input
                value={inputs.name}
                onChange={handleChange}
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 rounded-lg"
                placeholder="Your sweet name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                value={inputs.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  block p-2.5 dark:placeholder-gray-400 rounded-lg"
                placeholder="name@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
              <input
                value={inputs.phone}
                onChange={handleChange}
                type="phone"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  block p-2.5 dark:placeholder-gray-400 rounded-lg"
                placeholder="Your contacts"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="password"
                value={inputs.password}
                onChange={handleChange}
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  block p-2.5 dark:placeholder-gray-400 rounded-lg"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-whitw-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an admin account yet? <a href="/admin" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  
  );
};




import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import {FaBars} from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa';
import {useDispatch} from "react-redux"
import Swal from "sweetalert2";
import axios from '../../utils/axios';
import Navbar from '../Component/Navbar/Navbar';
import {auth, provider} from '../../../src/firebase'
import { signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google'; 
import Footer from '../Component/Footer/Footer';
import Cookies from 'js-cookie';
import {setUserDetails} from '../../redux/usernameSlice';


export default function Register() {
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
      .post("/api/register", data)
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
          navigate("/");
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

  // const signInWithGoogle = () => {
  //   // dispatch(loginStart());
  //   signInWithPopup(auth, provider)
  //     .then((result) => { 
  //       axios.post('api/google/', {
  //         name:result.user.displayName,
  //         email:result.user.email,
  //         token: result.data.jwt,
  //       }).then((response) => {
  //         console.log(response.data);
  //       })
  //       console.log(result)
  //     })
  //     .catch((error) => {});
  //     // dispatch(loginFailure());
  // }

  const signInWithGoogle = () => {
    // dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          const response = await axios.post('api/google/', {
            name: result.user.displayName,
            email: result.user.email,
          });
          Cookies.set("jwt_token", response.data.jwt);
          // Cookies.set("id", String(response.data.id));
      
          dispatch(setUserDetails({
            name: response.data.name,
            email:response.data.email,
            token: response.data.jwt,
            user_id: response.data.id,
          }));
          console.log(response.data);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        // dispatch(loginFailure());
      });
  };
  


  return (
    <section className="bg-gray-200 dark:bg-gray-900">
    <Navbar/>
    <div className="flex flex-col items-center justify-center px-4 py-20 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" style={{ width: '100%', maxWidth: '550px', height: 'auto' }}>
        <div className="p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up your account
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
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-whitw-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account yet? <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</a>
            </p>
          </form>
          <button className="flex justify-center items-center text-red-600"
            onClick={signInWithGoogle}> <pl className='text-white'>----------------------------------</pl>
            <GoogleIcon/><p className='text-green-600 font-bold'>o</p>
            <p className='font-bold'>o</p>
            <p className='text-orange-500 font-bold'>g</p>
            <p className='text-blue-400 font-bold'>l</p>
            <p className='text-yellow-400 font-bold'>e</p>
          </button>
        </div>
      </div>
    </div>
    <Footer/>
  </section>
  
  );
};




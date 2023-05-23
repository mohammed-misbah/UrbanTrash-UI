import {FaBars} from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import React, { useRef,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import images from  '../images/urban-trash.jpg';
import Swal from "sweetalert2";
import axios from '../../utils/axios';
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux"
import { loginPost } from '../../utils/constants';
import {setUserDetails} from '../../redux/usernameSlice';
import styles from './Login.module.css'
import Navbar from '../components/UserPages/Navbar/Navbar';


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
      axios
        .post(loginPost, data, {
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
          }
          else {
            console.log(response.data ,"data responded");
            Cookies.set("jwt", String(response.data.user_jwt));
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
    <div className={styles.card}>
        <div className={styles.title}>
            <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
        <div className={styles.input_container}>
        <input type='text' value={inputs.email} name='email'
        onChange={handleChange}
        placeholder='Enter email'/>
        
        <input type='password'value={inputs.password} name='password'
        onChange={handleChange}
         placeholder='Enter password'/>

      
         <button type='submit'>Login</button>
         <p>Dont have an account..?   <a href='/signin'>Signin</a></p>
         </div>
        </form>
      </div>
    </div>
  );
}
export default Login;




 // const handleSubmit = (event) => {
    //     event.preventDefault();
    // };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // handle login logic here
    //   };
    
      // const handleEmailChange = (event) => {
      //   setUsername(event.target.value);
      // };
    
      // const handlePasswordChange = (event) => {
      //   setPassword(event.target.value);
      // };
//   render() {

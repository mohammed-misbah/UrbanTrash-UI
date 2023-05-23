import React,{useRef,useState} from 'react'
import images from '../images/urban-trash.jpg';
import { useNavigate } from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import Swal from "sweetalert2";
// import Home from './Home';
// import Login from './Login';
import axios from '../../utils/axios';
import { signUpPost } from '../../utils/constants';
import styles from './Signin.module.css'
import Navbar from '../components/UserPages/Navbar/Navbar';

//  const Signin =() => {
// export class Signin extends Component {
function Signin() {
    const [name, setName]  = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate('');

    // console.log('submit history is')
    
    // render() {
    const handleSignin = (e) => {
            // console.log('is enteres',name);
            if (name.length <6){
                alert('Username must be six charecter long')
            };
            console.log('Email entered',email)
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)){
                alert('Please enter a valid Email address')
            };
            console.log('Phonenmbr entred',phone)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)){
            alert('Please enter a ten digit Phone number')
            };
            console.log('Password Entered',password)
            const minLenght = 8;
            const hasUpperCase = /[A-Z]/.test(password); 
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            if (password.length < minLenght || !hasUpperCase || !hasLowerCase || !hasNumber) {
                alert('Please enter a password with 8 charecter,including at lest one UpperCase letter,one lowerCase letter, and one number');
                return;
            };
            if (password !== confirmPassword){
                alert('Passowrd do not match');
                return;
            };
            navigate('/login');

            const body = JSON.stringify({
                name,
                email,
                phone,
                password,
              });
              e.preventDefault();
              axios
                .post(signUpPost, body, {
                  headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                  console.log(response.status)
                  console.log(response.data);
                  if (response.status === 201) {
                    navigate("/login");
                  } else {
                    Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: response.data.error,
                      showConfirmButton: false,
                      timer: 10000,
                    });
                  }
                })
                .catch((err) => {
                  Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: err.response.data.error,
                    showConfirmButton: false,
                    timer: 10000,
                  });
                });
            };
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className={styles.card}>
      <div className={styles.title}>
           <h1>Signin</h1>
        </div>
        <form method='POST' onSubmit={handleSignin}>
        <div className={styles.input_container}>
      <input type='text' value={name}
       onChange={(e) => setName(e.target.value)}
      placeholder='Enter name..'/>

      <input type='email' value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder='Enter email'/>

      <input type='phone' value={phone}
       onChange={(e) => setPhone(e.target.value)}
      placeholder='Enter phoneNumber'/>

      <input type='password' value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder='Enter password'/>

      <input type='password' value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder='Confirm password'/>

      <button type='submit'>Signin</button>
      <p>Alreary have an account..?  <a href='/login'>Login</a></p>
      </div>
      </form>
    </div>
    </div>
  );
};
// };
export default Signin;


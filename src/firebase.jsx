// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCrdHfjN7YIoMNuyXPH7a8Z8fCnFdoSsg4",
  authDomain: "login-160dc.firebaseapp.com",
  // apiKey:`${process.env.REACT_APP_FIREBASE_API_KEY}`,
  // authDomain:`${process.env.REACT_APP_AUTH_DOMAIN}` ,
  
  projectId: "login-160dc",
  storageBucket: "login-160dc.appspot.com",
  messagingSenderId: "808038580773",
  appId: "1:808038580773:web:a103e3b2a4f9ec259a75cc",
  measurementId: "G-VCJ6FYV23E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
// const auth = getAuth(app);
// export { auth };
// export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app












// import React, {useState} from 'react'
// import Navbar from '../Component/Navbar/Navbar';
// import Footer from '../Component/Footer/Footer';
// import {auth, provider} from '../../firebase';
// import Swal from "sweetalert2";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import axios from '../../utils/axios'
// import toast, { Toaster } from "react-hot-toast";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import {setUserDetails} from '../../redux/usernameSlice'
// import OtpInput from "otp-input-react";
// import {CgSpinner} from "react-icons/cg";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";



//     return (
//       <div className="bg-gray-200 dark:bg-gray-900">
//         <Navbar />
//         <div className="flex flex-col items-center justify-center px-4 py-20 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold text-gray-900 md:text-2xl mt-10">
//                 Your OTP Section
//               </h1>
//               {!viewOtpForm ? (
//                 <form className="space-y-4 md:space-y-6" onSubmit={requestOTP}>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-900">Verify Phone Number</label>
//                     <PhoneInput
//                       country={"in"}
//                       type="text"
//                       // placeholder='Your contact'
//                       name='phone'
//                       autoComplete='false'
//                       // value={phone}
//                       // onChange={setPhone}
//                       className=" text-gray-900 sm:text-sm rounded-lg mb-8"
//                     />
//                     <button type="submit" id='signin-button' 
//                     className="w-full text-sm text-white bg-blue-900 hover:bg-blue-700 rounded-lg item-center flex gap-2 justify-center py-2.5">
//                       {loading && <CgSpinner size={20} className='animate-spin'/>} Send code via SMS
//                     </button>
//                   </div>
//                   <Toaster/>
//                 </form>
//               ) : (
//                 <form
//                   id="otpform"
//                   onSubmit={(e) => { e.preventDefault(); verifyOTP(otp); }}
//                 >
//                   <div>
//                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Enter six digit OTP</label>
//                     <OtpInput
//                       type="number"
//                       OTPLength={6}
//                       disabled={false}
//                       autoFocus
//                       value={otp}
//                       // onChange={setOtp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       name="otp"
//                       id="otp"
//                       // placeholder="OTP place here"
//                       required
//                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
//                     />
//                   </div>
//                   <Toaster />
//                   <button
//                     type="submit"
//                     className="w-full text-sm text-white bg-blue-900 hover:bg-blue-700 rounded-lg item-center flex gap-2 justify-center py-2.5"
//                   >
//                     <CgSpinner size={10} className='animate-spin'/>
//                     Verify OTP
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
    
// }

// export default Otp




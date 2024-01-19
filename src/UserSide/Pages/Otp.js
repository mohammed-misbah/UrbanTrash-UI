import React, {useState} from 'react'
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import {auth, provider} from '../../firebase';
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../utils/axios'
import toast, { Toaster } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {setUserDetails} from '../../redux/usernameSlice'
import {CgSpinner} from "react-icons/cg";

const Otp = () => {
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState("");
    const [viewOtpForm, setViewOtpForm] = useState(false);
  
    const [role, setRole] = useState();
    const[name,setName]=useState();
    const [id,setId]=useState();
    const [tokenVal, setTokenVal] = useState();
    const[email,setEmail]=useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "signin-button", {
    size: "invisible",
    callback: (response) => {},
    defaultCountry: "IN",
  },
   auth
  );
};


    const requestOTP = async (e) => {
        e.preventDefault();
        let phone = e.target.phone.value;

        if (phone === "" || phone.length < 10)
        toast.error("Please enter a valid mobile number");
        else {
            const formattedphone = "+91" + phone;
            await axios.post('api/OTPlogin/', {
                phone: phone,
            })
            .then((response) => {
                console.log(response);

                setTokenVal(String(response.data.jwt));
                setRole(String(response.data.role));
                setId(String(response.data.id));
                setEmail(String(response.data.email))
                setName(String(response.data.name))

                if (response.data.status === "User is blocked") {
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "This user is blocked. Access is restricted.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                }
                if (response.data.status === "Success") {
                  generateRecaptcha();
                  let appVerifier = window.recaptchaVerifier;
                  signInWithPhoneNumber(auth, formattedphone, appVerifier)
                    .then((confirmationResult) => {
                      console.log("otp send");
                      setViewOtpForm(true);
                      window.confirmationResult = confirmationResult;
                    })
                .catch((error) => {
                  toast.error(`error=> ${error.message}`);
                });
            } else {
              toast.error("mobile not registered");
            }
          });
            
        }
    }

    const verifyOTP = (otp) => {
        if (window.confirmationResult) {
            window.confirmationResult
            .confirm(otp)
            .then((response) => {
                Cookies.set("jwt_user", tokenVal);
                Cookies.set("role", role);
                Cookies.set("id",id);

                dispatch( 
                  setUserDetails({
                        email: email,
                        name: name,
                        token: tokenVal,
                        user_id: id,
                    })
                );
                navigate("/user")
            })
            .catch((error) => {
                toast.error(`error=> ${error.message}`);
            });
        } else {
            toast.error("Confirmation result is not available");
        }
    };


    return (
      <div className="bg-gray-200 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-4 py-20 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl mt-10">
                Your OTP Section
              </h1>
              {!viewOtpForm ? (
                <form className="space-y-4 md:space-y-6" onSubmit={requestOTP}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Verify-Phone Number</label>
                    <input
                      type="text"
                      placeholder='Phone number'
                      name='phone'
                      autoComplete='false'
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 mb-10"
                    />
                    <button type="submit" id='signin-button' 
                    className="w-full text-sm text-white bg-blue-900 hover:bg-blue-700 rounded-lg item-center flex gap-2 justify-center py-2.5">
                    <CgSpinner size={20} className='animate-spin'/>Send code via SMS
                    </button>
                  </div>
                  <Toaster/>
                </form>
              ) : (
                <form
                  id="otpform"
                  onSubmit={(e) => { e.preventDefault(); verifyOTP(otp); }}
                >
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Enter six digit OTP</label>
                    <input
                      // type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      name="otp"
                      id="otp"
                      placeholder="OTP place here"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 mb-10"
                    />
                  </div>
                  <Toaster />
                  <button
                    type="submit"
                    className="w-full text-sm text-white bg-blue-900 hover:bg-blue-700 rounded-lg item-center flex gap-2 justify-center py-2.5">
                    <CgSpinner size={20} className='animate-spin'/>Verify OTP
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
    
}

export default Otp;

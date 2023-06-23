import React,{ useEffect,useState } from 'react'    
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../utils/axios';
import { setAdminDetails } from '../redux/adminReducer'
import Cookies from 'js-cookie';

const AdminLogin = () => {
    const navigate = useNavigate('');
    const dispatch = useDispatch('');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const token = Cookies.get('admin_jwt');
        if (token) {
            navigate('/admin');
        }
    },[navigate]);

    const handleAdminLOgin = async (event) => {
      event.preventDefault();
      const body = JSON.stringify({
        email,
        password,
      });

    
  if (email.trim() === "" || password.trim() === "") {
      Swal.fire('Please fill in all the fields.');
    } else {
      axios
        .post('/adminapi/login/', body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
          if (
            response.data.status === 'Wrong Password' ||
            response.data.status === "Email or Password is Wrong" ||
            response.data.status === "not admin"
          ) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Email or Password is incorrect",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Cookies.set("admin_jwt", String(response.data.admin_jwt));
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            if (response.status === 200) {
              dispatch(setAdminDetails(response.data.admin));
              navigate("/dashboard");
            }
          }
        });
    }
  };
    
    
  return (
        <section className="bg-gray-200 dark:bg-gray-900">
              <div className="flex flex-col items-center justify-center px-4 py-20 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mt-10">
                      Login in to your admin
                          </h1>
                          <form class="space-y-4 md:space-y-6" onSubmit={handleAdminLOgin}>
                              <div>
                                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                  <input 
                                  onChange={(event) => setEmail(event.target.value)}
                                  type="email" name="email"
                                  id="email" 
                                  required
                                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-600 block w-full p-2.5 dark:border-gray-600 dark:text-white" placeholder="name@company.com"/>
                              </div>
                              <div>
                                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                  <input type="password" 
                                  onChange={(event) => setPassword(event.target.value)}
                                  name="password" id="password" 
                                  placeholder="••••••••" 
                                  class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
                              </div>
                              <div class="flex items-center justify-between">
                                  <div class="flex items-start">
                                      <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700" />
                                      </div>
                                      <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                      </div>
                                  </div>
                                  <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                              </div>
                              <button type="submit" class="w-full text-white bg-blue-900 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-3 text-center">
                                Sign in</button>
                              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                  Don’t have an account yet? <a href="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                              </p>
                          </form>
                      </div>
                  </div>
              </div>
        </section>
  )
}

export default AdminLogin;

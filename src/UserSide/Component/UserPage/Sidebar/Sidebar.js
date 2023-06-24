import React, { useRef, useState, useEffect } from 'react';
// import { FaTimes} from 'react-icons/fa';
// import { MenuItem } from '@material-ui/core';
import Address from '../Address';
import {
  FaBars,
  FaTh,
  FaUserAlt,
  FaShoppingBag,
  FaPowerOff,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import axios from '../../../../utils/axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../../../redux/usernameSlice';
import { motion } from 'framer-motion';
// import Footer from './Footer/Footer';

const Sidebar = ({ children }) => {
  const [user, setUserState] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const checkToken = () => {
    const token = Cookies.get('jwt');
    if (!token) {
      console.log('no');
    } else {
      console.log(token);
      axios
        .get('api/verify_token/', {
          headers: {
            Authorization: `${token}`
          }
        })
        .then((response) => {

          // Cookies.remove('jwt');

          console.log(response);
          setUserState(response.data.user);
          dispatch(setUserDetails(response.data.user));
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogout = () => {
    Cookies.remove('jwt');
    axios
      .post('/api/logout/')
      .then((response) => {
        console.log('logout response', response);

        setUserState(null);
        // Navigate to login page
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  const MenuItem = [
    {
      path: '/user',
      name: 'User',
      icon: <FaUserAlt />
    },
    {
      path: '/pickupdetails',
      name: 'Pickup details',
      icon: <FaShoppingBag />
    },
    {
      path: '/address',
      name: 'Address',
      icon: <FaMapMarkerAlt />
    },
    // {
    //   path: '/login',
    //   name: 'SignOut',
    //   icon: <FaPowerOff />,
    //   onclick: handleLogout
    // }
  ];

  return (
    <>
    <Navbar />
    <div className="flex">
      {/* Replace the 'bars' div */}
      <div className="fixed top-8 left-1/2 z-10 flex items-center justify-center p-2 bg-white-500 rounded-lg shadow-lg" onClick={() => setExpanded(!expanded)}>
        <FaBars className="text-2xl" />
      </div>

      {/* Replace the 'sidebar' div */}
      <motion.div
        className={`fixed top-0 left-0 w-3/10 h-full bg-green-800 shadow-lg overflow-y-auto transition-transform duration-300 ${expanded ? 'translate-x-0' : '-translate-x-3/10'}`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
      >
        {/* Replace the 'logo' div */}
        <div className="flex items-center justify-center h-16 mt-8 ml-8">
          <h1 className="w-32 h-auto rounded-md" >Urban Trash</h1>
        </div>

        {/* Replace the 'menu' div */}
        <div className="mt-16 space-y-8">
          {MenuItem.map((item, index) => (
            <NavLink
              to={item.path}
              className="flex items-center gap-3 pl-8 pr-6 py-2 rounded-lg font-medium hover:bg-green-700"
              activeClassName="bg-green-700 text-white"
              key={index}
            >
              <div className="text-xl">{item.icon}</div>
              <span className="py-2 px-4 text-white">{item.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="flex items-center justify-center mt-auto">
          <FaPowerOff onClick={handleLogout}
          className="text-red-500 text-xl sm:text-2xl mt-10" />
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  </>

  );
};

export default Sidebar;

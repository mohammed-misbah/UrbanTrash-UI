import React, { useRef, useState } from 'react';
import images from '../../images/urban-trash.jpg';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
// import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const navRef  = useRef();
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const showNavbar = () => {
      navRef.current.classList.toggle();
  }
    return (
      <div style={{ height: '70px' }}>
      <header className="fixed top-0 w-full z-50 bg-green-900">
        <nav className="flex items-center justify-between py-7 px-4 sm:px-6 lg:px-5">
          <a href="/">
            <img src={images} alt="logo" className="h-14 sm:h-16" style={{ width: '110px' }} />
          </a>
          <ul className="hidden sm:flex items-center space-x-20 text-white">
            <li onClick={() => navigate('/')} className="cursor-pointer">
              Home
            </li>
    
            <li onClick={() => navigate('/pricelist')} className="cursor-pointer">
              Services
            </li>
    
            <li onClick={() => navigate('/contact')} className="cursor-pointer">
              Contact
            </li>
            {user ? (
              <li onClick={() => navigate('/user')} className="cursor-pointer">
                {user.name}
              </li>
            ) : (
              <li onClick={() => navigate('/login')} className="cursor-pointer">
                Login
              </li>
            )}
    
            <li>
              <FaBell />
            </li>
          </ul>
          <button
            className="text-white text-2xl sm:hidden"
            onClick={showNavbar}
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
        </nav>
      </header>
    </div>
    


      
  );
};


export default Navbar;
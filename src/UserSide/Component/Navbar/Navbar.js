import React, { useRef, useState } from 'react';
import images from '../../images/urban-trash.jpg';
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef();
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const showNavbar = () => {
      navRef.current.classList.toggle('navbar-items-dropdown');
    }


  return (
    <div style={{ height: '70px' }}>
      <header className="fixed top-0 w-full z-50 bg-green-900">
        <nav className="flex items-center justify-between py-7 px-4 sm:px-6 lg:px-5">
          <a href="/">
            <img src={images} alt="logo" className="h-14 sm:h-16" style={{ width: '110px' }} />
          </a>
          <ul
            className={`hidden sm:flex items-center space-x-20 text-white ${
              navRef.current ? 'navbar-items-dropdown' : ''
            }`}
          >
            <li onClick={() => navigate('/')} className="cursor-pointer hover:text-red-500">
              Home
            </li>

            <li onClick={() => navigate('/pricelist')} className="cursor-pointer hover:text-red-500">
              Services
            </li>

            <li onClick={() => navigate('/contact')} className="cursor-pointer hover:text-red-500">
              Contact
            </li>
            {user ? (
              <li onClick={() => navigate('/user')} className="cursor-pointer hover:text-red-500">
                {user.name}
              </li>
            ) : (
              <li onClick={() => navigate('/login')} className="cursor-pointer hover:text-red-500">
                Login
              </li>
            )}
{/* 
            <li>
              <FaBell />
            </li> */}
            <button className="relative p-2 text-white-800 hover:bg-gray-100 hover:text-gray-500 rounded-full">
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          </ul>
          <button
            className="text-white text-2xl sm:hidden"
            onClick={showNavbar}
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
          <button
            className="text-white text-2xl sm:hidden"
            onClick={showNavbar}
            aria-label="Close navigation"
          >
            <FaTimes />
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;













// const showNavbar = () => {
//   if (navRef.current) {
//     navRef.current.classList.toggle('navbar-items-dropdown');
// }
// };
//   return (
//     <div style={{ height: '70px' }}>
//     <header className="fixed top-0 w-full z-50 bg-green-900">
//       <nav className="flex items-center justify-between py-7 px-4 sm:px-6 lg:px-5">
//         <a href="/">
//           <img src={images} alt="logo" className="h-14 sm:h-16" style={{ width: '110px' }} />
//         </a>
//         <ul className={`hidden sm:flex items-center space-x-20 text-white ${navRef.current ? 'navbar-items-dropdown' : ''}`}>
//           <li onClick={() => navigate('/')} className="cursor-pointer">
//             Home
//           </li>
  
//           <li onClick={() => navigate('/pricelist')} className="cursor-pointer">
//             Services
//           </li>
  
//           <li onClick={() => navigate('/contact')} className="cursor-pointer">
//             Contact
//           </li>
//           {user ? (
//             <li onClick={() => navigate('/user')} className="cursor-pointer">
//               {user.name}
//             </li>
//           ) : (
//             <li onClick={() => navigate('/login')} className="cursor-pointer">
//               Login
//             </li>
//           )}
  
//           <li>
//             <FaBell />
//           </li>
//           </ul>
//         <button
//           className="text-white text-2xl sm:hidden"
//           onClick={showNavbar}
//           aria-label="Toggle navigation"
//         >
//           <FaBars />
//         </button>
//         <button
//           className="text-white text-2xl sm:hidden"
//           onClick={showNavbar}
//           aria-label="Close navigation"
//         >
//           <FaTimes />
//         </button>
//       </nav>
//     </header>

//   </div>
  


    
// );
// };
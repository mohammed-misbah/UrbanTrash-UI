import React,{useRef,useState} from 'react'
// import images from '../../images/urban-trash.jpg';
// import { FaTimes} from 'react-icons/fa';
// import { MenuItem } from '@material-ui/core';
import {FaBars,FaTh,FaUserAlt,FaShoppingBag,FaPowerOff,FaMapMarkerAlt} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'
import Navbar from '../Navbar/Navbar';
// import Footer from './Footer/Footer';

const Sidebar = ({children}) => {
  const[ isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  
  const MenuItem = [
  {
    path:"/dashboard",
    name:"Dashboard",
    icon:<FaTh/>
  },
  {
    path:"/user",
    name:"User",
    icon:<FaUserAlt/>
  },
  {
    path:"/order",
    name:"Order",
    icon:<FaShoppingBag/>
  },
  {
    path:"/address",
    name:"Address",
    icon:<FaMapMarkerAlt/>
  },
  {
    path:"/",
    name:"SignOut",
    icon:<FaPowerOff/>
  }
]
    return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <div style={{width: isOpen ? "200px" : "70px"}} className={styles.sidebar}>
          <div className={styles.top_section}>
          {/* <a href='/'><img  src={images} alt="logo"/></a> */}
            {/* <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Urban Trash</h1> */}
            <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={styles.bars}>
              <FaBars onClick={toggle}/>
            </div>
          </div>
          {
            MenuItem.map((item,index) =>(
              <NavLink to={item.path} key={index} className={styles.link} activeclassName={styles.active}>
                <div className='icon'>{item.icon}</div>
                <div style={{display: isOpen ? "block" : "none"}} className={styles.link_text}>{item.name}</div>
              </NavLink>
            ))
          }
        </div>
        <main>{children}</main>
      </div>
     
    </div>
    );
  };


export default Sidebar;
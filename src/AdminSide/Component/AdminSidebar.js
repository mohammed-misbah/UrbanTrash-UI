import React, { useState } from "react";
import Images from "../../AdminSide/Images/urban trash.jpg";
// import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import styles from "./AdminSidebar.module.css";


import {UilEstate,UilClipboardAlt,UilUsersAlt,UilPackage,UilArchive,UilArrowCircleDown} from "@iconscout/react-unicons";
import {FaPowerOff} from 'react-icons/fa'

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-40%'
    }
  }
  console.log(window.innerWidth)
  const SidebarData = [
    {
      path:'/admindashboard',
      icon: UilEstate,
      heading: "Dashboard",
  
    },
    {
      path:'/orders',
      icon: UilClipboardAlt,
      heading: "Orders",
    },
    {
      path:'/users',
      icon: UilUsersAlt,
      heading: "Users",
    },
    {
      path:'/categories',
      icon: UilPackage,
      heading: 'Category'
    },
    {
      path:'/products',
      icon: UilArchive,
      heading: 'Product'
    },
    {
      path:'',
      icon:FaPowerOff,
      //heading:'SignOut'
    }
  ];
  
  return (
    <>
      <div className={styles.bars} style={expanded?{left: '42%'}:{left: '3%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className={styles.sidebar}
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className={styles.logo}>
        <img src={Images} alt="logo" />
      </div>

      <div className={styles.menu}>
        {SidebarData.map((item, index) => {
          return (
            <NavLink
            // className={selected === index ? "menuItem active" : "menuItem"}
              to={item.path} className={`${styles.menuItem} ${selected === index ? styles.active                                                                                      : ""}`}
              key={index}
              onClick={() => setSelected(index)}
            >
              <div className={styles.icon}><item.icon /></div>
              <span>{item.heading}</span>
            </NavLink>
          );
        })}
        {/* signoutIcon */}
        <div className={styles.menuItem}>
         
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;




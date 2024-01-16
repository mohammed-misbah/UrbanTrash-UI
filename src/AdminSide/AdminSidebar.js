import React, { useState } from "react";
import Images from "../UserSide/images/urban-trash.jpg";
// import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';



import {UilEstate,UilClipboardAlt,UilUsersAlt,UilPackage,UilArchive} from "@iconscout/react-unicons";
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
  // console.log(window.innerWidth)
  const SidebarData = [
    {
      path:'/dashboard',
      icon: UilEstate,
      heading: "Dashboard",
  
    },
    {
      path:'/wastepickuplist',
      icon: UilClipboardAlt,
      heading: "WastePickuplist",
    },
    {
      path:'/scrapickuplist',
      icon: UilClipboardAlt,
      heading: "ScrapPickuplist",
    },
    {
      path:'/users',
      icon: UilUsersAlt,
      heading: "Users",
    },
    {
      path:'/wastecategory',
      icon: UilPackage,
      heading: 'Waste Category'
    },
    {
      path:'/scrapcategory',
      icon: UilPackage,
      heading: 'Scrap Category'
    },
    {
      path:'/biowaste',
      icon: UilArchive,
      heading: 'Bio Waste'
    },
    {
      path:'/scrapwaste',
      icon: UilArchive,
      heading: 'Scrap Waste'
    },
    {
      path:'',
      icon:FaPowerOff,
      //heading:'SignOut'
    }
  ];
  
  return (
<div>
      {/* Replace the 'bars' div */}
      <div className="fixed top-8 left-50 z-10 flex items-center justify-center p-2 bg-white-500 rounded-lg shadow-lg" onClick={() => setExpaned(!expanded)}>
        <UilBars className="text-2xl" />
      </div>

      {/* Replace the 'sidebar' div */}
      <motion.div
        className={`fixed top-0 left-0 w-3/10 h-full  bg-green-800 shadow-lg overflow-y-auto transition-transform duration-300 ${expanded ? 'translate-x-0' : '-translate-x-3/10'}`}
        variants={sidebarVariants}
        animate={window.innerWidth <= 500 ? `${expanded}` : ''}
      >
        {/* Replace the 'logo' div */}
        <div className="flex items-center justify-center h-16 mt-8 ml-8">
          <img src={Images} alt="logo" className="w-32 h-auto rounded-md" />
        </div>

        {/* Replace the 'menu' div */}
        <div className="mt-16 space-y-8">
          {SidebarData.map((item, index) => (
            <NavLink
              to={item.path}
              className={`flex items-center gap-3 pl-8 pr-6 py-2 rounded-lg font-medium ${selected === index ? 'bg-green-700 text-red-800' : 'hover:bg-green-700'}`}
              key={index}
              onClick={() => setSelected(index)}
            >
              <div className="text-xl"><item.icon /></div>
              <span class='py-2 px-4 text-white'>{item.heading}</span>
            </NavLink>
          ))}

          {/* Replace the 'menuItem' div */}
          <div className="relative pl-8 pr-6 py-2 mt-auto">
            {/* <div className={styles.icon}><FaPowerOff /></div> */}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;




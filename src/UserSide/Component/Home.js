import React, { useRef } from 'react'
import waste1 from '../images/waste 1.jpeg';
import waste2 from '../images/waste 2.jpg'
// import {FaBars} from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa';
// import { Routes, Route } from 'react-router-dom';
// import {FaUserAlt} from 'react-icons/fa'
// import Sidebar from './UserPages/Sidebar';
import Card from './Card/Card'
// import {} from 'mdb-react-ui-kit';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function Home() {
  
    return (
        <div>
        <Navbar />
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 relative">
            <img src={waste1} alt="waste1" className="w-full h-auto" />
            <a href="/wastepickup" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-20 bg-green-700 shadow-lg flex items-center justify-center text-white text-lg">
              Waste Pickup
            </a>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 relative">
            <img src={waste2} alt="waste2" className="w-full h-auto" />
            <a href="/scrappickup" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-20 bg-yellow-500 shadow-lg flex items-center justify-center text-white text-lg">
              Scrap Pickup
            </a>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <Card />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <Card />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <Card />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
      
    )
  }

export default Home;

                
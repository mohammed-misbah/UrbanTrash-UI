import React, { useRef } from 'react'
import waste1 from '../images/waste 1.jpeg';
import waste2 from '../images/waste 2.jpg'
// import {FaBars} from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa';
// import { Routes, Route } from 'react-router-dom';
// import {FaUserAlt} from 'react-icons/fa'
// import Sidebar from './UserPages/Sidebar';
import styles from './Home.module.css'
import Card from '.././components/UserPages/Card/Card'
import {
} from 'mdb-react-ui-kit';
import Navbar from './UserPages/Navbar/Navbar';
import Footer from './UserPages/Footer/Footer';

function Home() {
  
    return (
      <div >
       <div>
        <Navbar/>
       </div>
       <div style={{ display: 'flex' }}>
                 <div style={{ flex: 1, position: 'relative' }}>
                   <img src={waste1} alt='waste1' className={styles.waste1} style={{ width: '100%', height: 'auto' }} />
                   <a href="/booking" className={styles.linkButton1} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                     Book Now..
                   </a>
                 </div>
                 <div style={{ flex: 1, position: 'relative' }}>
                   <img src={waste2} alt='waste2' className={styles.waste2} style={{ width: '100%', height: 'auto' }} />
                   <a href="#" className={styles.linkButton2} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                     Thank Link
                   </a>
                 </div>
               </div>
        <div style={{display:'flex'}}>
          <div style={{flex: 2}}>
            <Card/>
          </div>
          <div style={{flex:2}}>
            <Card/>
          </div>
          <div style={{flex:2}}>
            <Card/>
          </div>
        </div>
        
        <div>
          <Footer/>
        </div>
        </div>
    )
  }

export default Home;

                
import React,{useRef,useState} from 'react'
import images from '../../images/urban-trash.jpg';
import {FaBars} from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import styles from './Address.module.css'
// import Footer from './Footer/Footer'
// import Navbar from './Navbar/Navbar';


const Address = () => {
    return (
      <div>
  
       <div className={styles.formContainer}>
       <form>
         <div className={styles.formRow}>
           <div className={styles.formColumn}>
             <input type="text" name="first_name" placeholder="First Name" />
             <input type="text" name="email" placeholder="Enter an email" />
             <input type="text" name="address1" placeholder="Enter Address 1" />
             <input type="text" name="password" placeholder="Pin Code" />
           </div>
           <div className={styles.formColumn}>
             <input type="text" name="last_name" placeholder="Last Name" />
             <input type="text" name="phone" placeholder="Enter phone" />
             <input type="text" name="address2" placeholder="Enter Address 2" />
           </div>
         </div>
       </form>
       </div>
       {/* <div>
        <Footer/>
       </div> */}
      </div>
    );
  };


export default Address;
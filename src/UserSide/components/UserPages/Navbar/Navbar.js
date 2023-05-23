import React,{useRef,useState} from 'react'
import images from '../../../images/urban-trash.jpg';
import {FaBars} from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import {FaUserAlt} from 'react-icons/fa'
import styles from './Navbar.module.css'

const Navbar = () => {
  const navRef  = useRef();
  const showNavbar = () => {
      navRef.current.classList.toggle(styles.responsive_nav);
  }
    return (
      <div style={{height: '80px'}}>
       
        <header>
          <nav ref={navRef}>
            <a href='/'><img  src={images} alt="logo"/></a>
              <span className={styles.aWrapper}>
                  <a href="/">Home</a>
                  <a href="#">About</a>
                  <a href="#">Services</a>
                  <a href="#">Support</a>
                  <a href="#">Contact</a>
                  <a href='/login'>Login</a>
              </span>
                <button className={`${styles['navBtn']} ${styles['navCloseBtn']}`} onClick={showNavbar}>
                  <FaTimes/>
                </button>
              <div className='user'>
                  <a href='/signin'><FaUserAlt/></a>
              </div>
          </nav>
          <button className={styles.navBtn} onClick={showNavbar}>
            <FaBars/>
          </button>
          
</header>
</div>
  );
};


export default Navbar;
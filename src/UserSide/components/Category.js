import React, {useRef} from 'react'
import {FaBars} from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import images from '../images/urban-trash.jpg';
import styles from './Category.module.css'
import Navbar from './UserPages/Navbar/Navbar';
import Footer from './UserPages/Footer/Footer';

function Category() {

    return (
        <div>
          <Navbar/>
          <div>
            <Footer/>
          </div>
        </div>
    )
}

export default Category













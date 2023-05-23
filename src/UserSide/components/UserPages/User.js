import React from 'react'
// import images from '../../images/urban-trash.jpg';
import images from '../../images/profile.jpg'
// import {FaBars} from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa';
import styles from './User.module.css'
import Footer from './Footer/Footer';
// import Navbar from './Navbar/Navbar';
const User = () => {
 
    return (
  
<div>
 
    <div className={styles.profile}>
      <div className={styles.profileSection}>
        <img src={images} alt="User Profile" className={styles.profileImage} />
        <h2>Misba ul haq</h2>
      </div>
      <div className={styles.profileInfo}>
        <table className={styles.profileTable}>
          <tbody>
            <tr>
              <td>User ID:</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>Mohammed Misbah</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>mizbaofficial369@example.com</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>+919061366858</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>Kasaragod, Kerala</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

       <div className={styles.formContainer}>
       <form>
         <div className={styles.formRow}>
           <div className={styles.formColumn}>
             <input type="text" name="first_name" placeholder="Enter a name" />
             <input type="phon" name="phone" placeholder="Enter an phone" />
           </div>
           <div className={styles.formColumn}>
             <input type="email" name="email" placeholder="Enter email" />
             
           </div>
         </div>
       </form>
       </div>
       <div>
        <Footer/>
       </div>

</div> 
    
    )
  };


export default User;

  
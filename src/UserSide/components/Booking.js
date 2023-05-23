import React,{useRef,useState} from 'react'
import Navbar from '../components/UserPages/Navbar/Navbar';
import styles from './Booking.module.css'

const Booking = () => {
    return (
      <div>
        <div>
            <Navbar/>
        </div>
        <div class={styles.bookingForm}>
  <div class={styles.bookingCard}>
    <div class={styles.formColumn}>
      <div class={styles.formRow}>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name"/>
      </div>
      <div class={styles.formRow}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email"/>
      </div>
    </div>
    <div className={styles.formRow}>
  <p><label htmlFor="address">Address</label></p>
  <div className={styles.addressSelection}>
    
    <select id="addressSelection" name="addressSelection">
      <option value="">Select an address</option>
      <option value="address1">Address 1</option>
      <option value="address2">Address 2</option>
      <option value="address3">Address 3</option>
    </select>
  
  </div>
</div>

    <div class={styles.formColumn}>
      <div class={styles.formRow}>
        <label for="datetime">Date and Time</label>
        <div class={styles.datetimeContainer}>
          <input type="date" id="date" name="date"/>
          <select id="time" name="time">
            <option value="9am">9:00 AM</option>
            <option value="10am">10:00 AM</option>
            <option value="11am">11:00 AM</option>
          </select>
        </div>
      </div>
      <div class={styles.formRow}>
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Enter your message"></textarea>
      </div>
      <div class={styles.formRow}>
        <button type="submit">Book Now</button>
      </div>
    </div>
  </div>
</div>

</div>




    );
  };

export default Booking;
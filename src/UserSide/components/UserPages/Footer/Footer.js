import React,{useRef,useState} from 'react'
import { FaFacebook, FaTwitter, FaInstagram,FaWhatsapp } from 'react-icons/fa';
// import { FaFacebook } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css'


const Footer = () => {
    return (
      <div>
        <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumn}>
          <h2>About</h2>
          <p>Urban Trash Private Limited <br/>is a waste management company dedicated to <br/>providing sustainable solutions for <br/>waste collection and disposal.</p>
          <div className={styles.socialMediaIcons}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href='#'><FaWhatsapp/></a>
          </div>
        </div>
        <div className={styles.footerColumn}>
          <h2>Contact</h2>
          <h3>CHAYICKARA HOUSE, PERINGALA PO,<br />KUNNATHUNAD, ERNAKULAM,<br />Ernakulam, Kerala, India, 683565</h3>
          <p>Call Us - 623 0606 623, 890 7780 555</p>
          <p>Email - info@urbantrash.in</p>
        </div>
        <div className={styles.footerColumn}>
          <h2>Working Hours</h2>
          <p>Monday - Saturday: 8AM–6PM</p>
          <h4><p>Sunday: Closed</p></h4>
          <textarea name="message" placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </div>
      </div>
      
    </footer>

      </div>
    );
  };


export default Footer;
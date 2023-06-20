import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram,FaWhatsapp } from 'react-icons/fa';
// import { FaFacebook } from '@fortawesome/react-fontawesome';



const Footer = () => {
    return (
      <div>
        <footer className="bg-green-900 py-12">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10">
                <h2 className="text-xl font-bold text-white mb-4">About</h2>
                <p className="text-white">Urban Trash Private Limited <br />is a waste management company dedicated to <br />providing sustainable solutions for <br />waste collection and disposal.</p>
                <div className="flex">
                    <a href="#"><FaFacebook className="text-white mr-3" /></a>
                    <a href="#"><FaTwitter className="text-white mr-3" /></a>
                    <a href="#"><FaInstagram className="text-white mr-3" /></a>
                    <a href="#"><FaWhatsapp className="text-white mr-3" /></a>
                </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10">
                <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
                <h3 className="text-white">CHAYICKARA HOUSE, PERINGALA PO,<br />KUNNATHUNAD, ERNAKULAM,<br />Ernakulam, Kerala, India, 683565</h3>
                <p className="text-white">Call Us - 623 0606 623, 890 7780 555</p>
                <p className="text-white">Email - info@urbantrash.in</p>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10">
                <h2 className="text-xl font-bold text-white mb-4">Working Hours</h2>
                <p className="text-white">Monday - Saturday: 8AM–6PM</p>
                <h4><p className="text-red-500">Sunday: Closed</p></h4>
                <textarea className="w-full h-12 p-2 border border-gray-300 rounded mb-3 text-black" name="message" placeholder="Your Message"></textarea>
                <button className="bg-green-700 text-white px-20 py-2" type="submit">Send</button>
                </div>
            </div>
        </footer>


      </div>
    );
  };


export default Footer;
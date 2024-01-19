import React from 'react'
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer'


const getContactInfo = () => {
  return (
    <div >
    <Navbar/>
            <div className="container mx-auto mt-20">
            <div className="contactdetails bg-yellow-200 rounded-lg shadow-md p-4 flex flex-col justify-center items-center min-h-[600px]">
            <h2 className="text-2xl font-bold text-center mb-4">Contact Information</h2>
            <p className="text-xl font-bold mb-2">URBAN TRASH</p>
            <p className="text-lg mb-2">CHAYICKARA HOUSE, PERINGALA PO,KUNNATHUNAD, ERNAKULAM,</p>
            <p className="text-lg mb-2">Ernakulam, Kerala, India, 683565</p>
            <p className="text-lg mb-2">Call Us - 623 0606 623, 890 7780 555</p>
            <p className="text-lg mb-2">Email - info@urbantrash.in</p>
            <p className="text-lg mb-2">Working Hours:</p>
            <p className="text-lg mb-2">Monday - Saturday: 8AM–6PM</p>
            <p className="text-lg mb-2">Sunday: Closed</p>
        </div>
        </div>

       
    {/* <div className="fixed left-0 bottom-0 w-full bg-gray-200 text-center py-4 mt-20">
        <Footer/>
    </div> */}
  </div>

  

  )
}

export default getContactInfo;

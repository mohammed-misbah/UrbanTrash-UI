
import React,{ useState,useEffect } from 'react'
// import Table from 'react-bootstrap/Table';
import axios from '../../../utils/axios'
// import Footer from './Footer/Footer';
// import Navbar from './Navbar/Navbar';
import { useSelector } from "react-redux";

const Pickupdetails = () => {
  const [wastebookings, setWasteBookings] = useState([])
  const [scrapbookings, setScrapBooking] = useState([])
  const { user } = useSelector((state) => state.user);
  console.log(user,"uuuuuser enteeeeeeeered..!!");


  useEffect(() => {
    fetchWasteBookingdetails();
    fetchScrapBookingdetails();  
  },[user]);

  const fetchWasteBookingdetails = () => {  
    const id = user?.id
    axios
    .get(`/api/pickup_detail/${id}`)
    .then((response) => {
      console.log(response,"Waaaaaaaaste Ooooooooorder deeeeetails prrrrrrrinted");
      setWasteBookings(response.data);
      console.log(response.data);
    })
    .catch(error =>{
      console.error('Error fetching Waste Booking data',error)
    });
  };  
  console.log(wastebookings,"waaaaste booooooooking details")

              // Scrap Booking details //

  const fetchScrapBookingdetails = () => {
    const id = user?.id
    axios 
    .get(`/api/scrappickup_detail/${id}/`)
    .then((response) => {
      console.log(response,"Scrap Ooooooooorder deetails enteeeeeeeeeeeered")
      setScrapBooking(response.data);
      console.log(response.data);
    })
    .catch(error =>{
      console.error('Error fetching Scrap Booking data',error)
    });
  };
  console.log(scrapbookings, "Scraaaaaap booooooooking deeeetails")



    return (
      <div className="container mx-auto px-4 py-8 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">Waste Pickup Details</h1>
            {wastebookings.map((wastebooking) => (
            <div key={wastebooking.id} className="bg-gradient-to-r bg-white rounded-lg shadow-md mb-8 p-6">
            <div className="mb-4">
              <p className="font-semibold text-lg text-blue-900">Pickup ID: {wastebooking.id}</p>
              <p><span className='font-bold'>Customer:</span> <span className="font-semibold">{wastebooking.customer}</span></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <p className="text-green-700 font-bold">Waste Type: {wastebooking.biowaste}</p>
                <p><span className='font-bold mb-3'>Pickup Date:</span> {wastebooking.pickup_date}</p>
                <p><span className='font-bold mb-3'>Pickup Time:</span> {wastebooking.pickup_time}</p>
              </div>
              <div className="mb-4">
                <p><span className='font-bold'>Weight:</span> <span className="font-semibold text-red-600">{wastebooking.waste_weight}Kg</span></p>
                <p><span className='font-bold'>Price:</span> <span className="font-semibold text-purple-600">{wastebooking.price}Rs</span></p>
              </div>
              <div className="mb-4">
                <p>Status:<span className='font-bold text-red-500'> {wastebooking.status} </span></p>
              </div>
            </div>
            <div className="mt-4">
              <p><span className='font-bold'>Address:</span></p>
              <p>{wastebooking.address.address1},{wastebooking.address.address2},{wastebooking.address.phone},{wastebooking.address.pincode}</p>
            </div>
          </div>
            ))}



            <h1 className="text-2xl font-bold mb-4 text-indigo-700">Scrap Pickup Details</h1>
            {scrapbookings.map((scrapbooking) => (
            <div key={scrapbooking.id} className="bg-gradient-to-r bg-white rounded-lg shadow-md mb-8 p-6">
            <div className="mb-4">
              <p className="font-semibold text-lg text-blue-900">Pickup ID: {scrapbooking.id}</p>
              <p><span className='font-bold'>Customer:</span> <span className="font-semibold">{scrapbooking.customer}</span></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <p className="text-green-700 font-bold">Scrap Type: {scrapbooking.scrapwaste}</p>
                <p><span className='font-bold mb-3'>Pickup Date:</span> {scrapbooking.pickup_date}</p>
                <p><span className='font-bold mb-3'>Pickup Time:</span> {scrapbooking.pickup_time}</p>
              </div>
              <div className="mb-4">
                <p><span className='font-bold'>Weight:</span> <span className="font-semibold text-red-600">{scrapbooking.scrap_weight}Kg</span></p>
                <p><span className='font-bold'>Price:</span> <span className="font-semibold text-purple-600">{scrapbooking.price}Rs</span></p>
              </div>
              <div className="mb-4">
                <p>Status:<span className='font-bold text-red-500'> {scrapbooking.pickup_status} </span></p>
              </div>
            </div>
            <div className="mt-4">
              <p><span className='font-bold'>Address:</span></p>
              <p>{scrapbooking.address.address1},{scrapbooking.address.address2},{scrapbooking.address.phone},{scrapbooking.address.pincode}</p>
            </div>
          </div>
            ))}
      </div>
      
    );
  };


export default Pickupdetails;
import React,{useRef,useState,useEffect} from 'react'
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
    .post(`/api/order_detailist/${id}/`)
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
    .post(`/api/scraporder_detailist/${id}/`)
    .then((response) => {
      console.log(response,"Scrap Ooooooooorder deetails enteeeeeeeeeeeered")
      setScrapBooking(response.data);
      console.log(response.data);
    })
    .catch(error =>{
      console.error('Error fetching Scrap Booking data',error)
    });
  };
  // console.log(scrapbookings, "Scraaaaaap booooooooking deeeetsils")


    return (
        <div className="container mx-auto">
        <div className="w-full p-4 bg-opacity-60 bg-green-200 rounded-md">
          <div className="w-full bg-green-100 p-2 rounded-t-md">
            <h1 className="text-lg font-bold">Pickup Details</h1>
          </div>
          <div className="w-full bg-green-50 p-4 rounded-b-md">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">WasteType</th>
                  <th className="py-2 px-4">WasteWeight</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">PickupDate</th>
                  <th className="py-2 px-4">PickupTime</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wastebookings.map((wastebooking) => (
                  <tr key={wastebooking.id}>
                    <td className="py-2 px-4">{wastebooking.address.lastname}</td>
                    <td className="py-2 px-4">
                      {wastebooking.address.address1},
                      {wastebooking.address.address2}-<br />
                      {wastebooking.address.phone}-{wastebooking.address.pincode}
                    </td>
                    <td className="py-2 px-4">{wastebooking.biowaste.name}</td>
                    <td className="py-2 px-4">{wastebooking.pickup_date}</td>
                    <td className="py-2 px-4">{wastebooking.pickup_time}</td>
                  </tr>
                ))}
                {scrapbookings.map((scrapbooking) => (
                  <tr key={scrapbooking.id}>
                    <td className="py-2 px-4">{scrapbooking.address.lastname}</td>
                    <td className="py-2 px-4">
                      {scrapbooking.address.address1},
                      {scrapbooking.address.address2}-<br />
                      {scrapbooking.address.phone}-{scrapbooking.address.pincode}
                    </td>
                    <td className="py-2 px-4">{scrapbooking.scrapwaste.name}</td>
                    <td className="py-2 px-4">{scrapbooking.scrap_weight}</td>
                    <td className="py-2 px-4">{scrapbooking.price}</td>
                    <td className="py-2 px-4">{scrapbooking.pickup_date}</td>
                    <td className="py-2 px-4">{scrapbooking.pickup_time}</td>
                    <td className="py-2 px-4">{scrapbooking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    );
  };


export default Pickupdetails;




// {
// "waste_weight":1000,
// "price":200,
// "pickup_date":2023-05-21,
// "pickup_time":10:25:00,
// "status":"pending",
// "address":1,
// "biowaste":1,
// "cust0rmor":1,
// "wastebooking":1
// }


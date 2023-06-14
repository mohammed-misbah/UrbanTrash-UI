import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from '../../../../utils/axios';
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [wastebookings, setWasteBookings] = useState([])
  const [scrapbookings, setScrapBooking] = useState([])
  const navigate =useNavigate();
  
  useEffect(() => {
    fetchWasteBooking();
  },[]);
  
  const fetchWasteBooking = () => {
    axios
      .get('/api/order_detail/')
      .then((response) => {
        console.log(response,"Pickuuuuuuup deeeeeeetails priiiiiinted");
        setWasteBookings(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching Booking data', error)
      });
  };
  console.log(wastebookings,"Waaaaste booooooking deetails enteeeeeeered");

  
  const redirectToPickupDetail = (id) => {
    navigate(`/wasteupdate/${id}`)
  }

 
  return (
    <div className="flex flex-col">
    <div className="flex justify-between items-center bg-opacity-50 bg-green-900 rounded-md p-3">
      <h1 className="text-white right-40">Waste Pickup Details</h1>
    </div>
    <div className="bg-green-800 bg-opacity-80 p-10 rounded-t-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 text-white">Id</th>
            <th className="py-2 px-4 text-white">Customer</th>
            <th className="py-2 px-4 text-white">Address</th>
            <th className="py-2 px-4 text-white">Waste</th>
            <th className="py-2 px-4 text-white">Price</th>
            <th className="py-2 px-4 text-white">Weight</th>
            <th className="py-2 px-4 text-white">Pickup Date</th>
            <th className="py-2 px-4 text-white">Pickup Time</th>
            <th className="py-2 px-4 text-white">Status</th>
            <th className="py-2 px-4 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {wastebookings.map(wastebooking => ( 
            <tr key={wastebooking.id}>
              <td className="py-2 px-4">{wastebooking.id}</td>
              <td className="py-2 px-4">{wastebooking.address.lastname}</td>
              <td className="py-2 px-4">{wastebooking.address.address1},
              {wastebooking.address.address2}-
              {wastebooking.address.phone}-
              {wastebooking.address.pincode}
              </td>

              <td className="py-2 px-4">{wastebooking.biowaste.name}</td>
              <td className="py-2 px-4">{wastebooking.waste_weight}</td>
              <td className="py-2 px-4">{wastebooking.price}</td>
              <td className="py-2 px-4">{wastebooking.pickup_date}</td>
              <td className="py-2 px-4">{wastebooking.pickup_time}</td>
              <td className="py-2 px-4">{wastebooking.status}</td>
              <td className="py-2 px-4">
                <button onClick={() => redirectToPickupDetail(wastebooking.id)}
                  className="text-blue-600 hover:underline"> Update
                </button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  );
};

export default Order;
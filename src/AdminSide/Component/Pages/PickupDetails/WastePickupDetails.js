import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from '../../../../utils/axios';
import { useNavigate } from "react-router-dom";

const WastePickupDetails = () => {
  const [wastebookings, setWasteBookings] = useState([])

  const navigate =useNavigate();
  
  useEffect(() => {
    fetchWasteBooking();
  },[]);
  
  const fetchWasteBooking = () => {
    axios
      .get('/api/pickup_detailist/')
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
    <div className="bg-green-800 bg-opacity-60 p-10 rounded-t-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-8 px-12 text-white">Id</th>
            <th className="py-8 px-12 text-white">Customer</th>
            <th className="py-8 px-12 text-white">Address</th>
            <th className="py-8 px-12 text-white">Waste</th>
            <th className="py-8 px-12 text-white">Price</th>
            <th className="py-8 px-12 text-white">Weight</th>
            <th className="py-8 px-12 text-white">Pickup Date</th>
            <th className="py-8 px-12 text-white">Pickup Time</th>
            <th className="py-8 px-12 text-white">Status</th>
            <th className="py-8 px-12 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {wastebookings.map(wastebooking => ( 
            <tr key={wastebooking.id}>
              <td className="py-10 px-20">{wastebooking.id}</td>
              <td className="py-10 px-20">{wastebooking.customer}</td>
              <td className="py-10 px-20">{wastebooking.address.address1},
              {wastebooking.address.address2}-
              {wastebooking.address.phone}-
              {wastebooking.address.pincode}
              </td>

              <td className="py-10 px-20">{wastebooking.biowaste}</td>
              <td className="py-10 px-20">{wastebooking.price}</td>
              <td className="py-10 px-20">{wastebooking.waste_weight}</td>
              <td className="py-10 px-20">{wastebooking.pickup_date}</td>
              <td className="py-10 px-20">{wastebooking.pickup_time}</td>
              <td className="py-10 px-20">{wastebooking.status}</td>
              <td className="py-10 px-20">
                <button onClick={() => redirectToPickupDetail(wastebooking.id)}
                  className="bg-yellow-500 hover:bg-yellow-500 text-white rounded px-10 py-2.5 transition-colors duration-300"> 
                  Update
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

export default WastePickupDetails;
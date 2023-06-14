import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from '../../../../utils/axios';
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [scrapbookings, setScrapBooking] = useState([])
  const navigate =useNavigate();
  
  useEffect(() => {
    fetchScrapBooking();
  },[]);

  const fetchScrapBooking = () => {
    axios
    .get('api/scraporder_detail')
    .then((response) => {
      console.log(response,"Scrap Pickupdeeetails Priiinted");
      setScrapBooking(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching Booking data', error)
    });
  }
  console.log(scrapbookings,'Scrap booking details entered');

  const redirectToPickupDetail = (id) => {
    navigate(`/scrapupdate/${id}`)
  }

  return (
    <div className="flex flex-col">
    <div className="flex justify-between items-center bg-opacity-50 bg-green-900 rounded-md p-3">
      <h1 className="text-white right-40">Scrap Pickup Details</h1>
      
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
          {scrapbookings.map(scrapbooking => ( 
            <tr key={scrapbooking.id}>
              <td className="py-2 px-4">{scrapbooking.id}</td>
              <td className="py-2 px-4">{scrapbooking.address.lastname}</td>
              <td className="py-2 px-4">{scrapbooking.address.address1},
              {scrapbooking.address.address2}-
              {scrapbooking.address.phone}-
              {scrapbooking.address.pincode}
              </td>

              <td className="py-2 px-4">{scrapbooking.biowaste.name}</td>

              <td className="py-2 px-4">{scrapbooking.waste_weight}</td>
              <td className="py-2 px-4">{scrapbooking.price}</td>
              <td className="py-2 px-4">{scrapbooking.pickup_date}</td>
              <td className="py-2 px-4">{scrapbooking.pickup_time}</td>
              <td className="py-2 px-4">{scrapbooking.status}</td>
              <td className="py-2 px-4">
                <button onClick={() => redirectToPickupDetail(scrapbooking.id)}
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
import React, { useState, useEffect } from 'react'
import axios from '../../../../utils/axios'
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';

const WastePickupUpdate = () => {
    const {id} = useParams();
    const [pickup, setPickup] = useState('');
    const [price, setPrice] = useState('');
    const [waste_weight, setWeight] = useState('');
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPickup();
    }, []);

    const fetchPickup = () => {
        axios.get(`/api/pickup_update/${id}/`)
        .then((response) => {
            setPickup(response.data);
            setPrice(response.data.price);
            setStatus(response.data.status);
            setWeight(response.data.waste_weight);
        })
        .catch((error) => {
            console.error('Error fetching order',error)
        });
    };
    console.log("Pickup deeeetails");


    const updatePickup = () => {
        const updatedPickup ={
            ...pickup,
            price:price,
            waste_weight:waste_weight,
            status:status
        };

        axios.post(`/api/pickup_update/${id}/`, updatedPickup)
        .then((response) => {
            console.log("Pickup Updated Successfully",response.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Pickup updated successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            setPickup(response.data);
        })
        .catch((error) => {
            console.error("Error updating order:", error);
          });
    };
    console.log("Updaaaaaate pickup", pickup)


    const deletePickup = () => {
        axios.delete(`/api/pickup_update/${id}/`)
        .then((response) =>{
            console.log("Order deleted Successfully");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Delete Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/api/pickup_detailist')
        })
        .catch((error) => {
            console.error("Error deleting wastepickup:",error);
        })
    };

    if (!pickup) {
        return <p>Loading...</p>;
    }
    
return (
    <div className="max-w-2xl mx-auto p-8 mt-20 bg-opacity-60 bg-green-800 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Order Update</h2>
        <p>Pickup ID: {pickup.id}</p>
        <div className="mb-4">
      <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Price:</label>
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div  className="mb-4">
        <label htmlFor="description">Weight:</label>
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
          value={waste_weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div  className="mb-4">
        <label htmlFor="recyclable">Status:</label>
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

       
      <button
      type="submit"
      className="w-full px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-red-500"
      onClick={updatePickup}
    >
      Update Pickup
    </button>
  
    <button
      type="submit"
      className="w-full px-4 py-2 mt-4 text-white bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500"
      onClick={deletePickup}
    >
      Delete Pickup
    </button>
    </div>
  );
};

export default WastePickupUpdate; 

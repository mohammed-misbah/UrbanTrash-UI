import React, { useState, useEffect } from 'react'
import axios from '../../../../utils/axios'
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';

const ScrapPickupUpdate = () => {
    const {id} = useParams();
    const [pickup, setPickup] = useState('');
    const [price, setPrice] = useState('');
    const [scrap_weight, setWeight] = useState('');
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPickup();
    }, []);

    const fetchPickup = () => {
        axios.get(`/api/scrapickup_update/${id}/`)
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
            scrap_weight:scrap_weight,
            status:status
        };

        axios.post(`/api/scrapickup_update/${id}/`, updatedPickup)
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
        axios.delete(`/api/scrapickup_update/${id}/`)
        .then((response) =>{
            console.log("Order deleted Successfully");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Delete Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/api/scraporder_detail')
        })
        .catch((error) => {
            console.error("Error deleting order:",error);
        })
    };

    if (!pickup) {
        return <p>Loading...</p>;
    }
    
return (
    <div className="max-w-2xl mx-auto p-8 mt-20 bg-red-400 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Order Detail</h2>
     <p>Pickup Id: {pickup.id}</p>
    <div className="mb-4">
      <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
        Price:
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  
    <div className="mb-4">
      <label htmlFor="description" className="block mb-1 font-semibold text-gray-700">
        Weight:
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
        value={scrap_weight}
        onChange={(e) => setWeight(e.target.value)}
      />
    </div>
  
    <div className="mb-4">
      <label htmlFor="recyclable" className="block mb-1 font-semibold text-gray-700">
        Status:
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  
    <button
      type="submit"
      className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
      onClick={updatePickup}
    >
      Update Pickup
    </button>
  
    <button
      type="submit"
      className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
      onClick={deletePickup}
    >
      Delete Pickup
    </button>
  </div>
  
  );
};

export default ScrapPickupUpdate; 

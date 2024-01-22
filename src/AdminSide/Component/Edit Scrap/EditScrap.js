import React, { useEffect, useState} from 'react'
import axios from '../../../utils/axios'
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";


const EditScrap = () => {
    const {id} = useParams();
    const [scrapWaste, setScrapWaste] = useState('')
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [weight, setWeight] = useState(null);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchScrap();
    },[]);

    const fetchScrap = () => {
        axios.get(`/adminapi/scrapwastedit/${id}/`)
        .then((response) => {
            setScrapWaste(response.data);
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setWeight(response.data.weight);
            setImage(response.data.image);
            setCategory(response.data.category);
        })
        .catch((error) => {
            console.error("Error fetching Scrap Waste",error)
        });
    };

    const updateScrap = () => {
        const updatedScrap = {
            ...scrapWaste,
            name:name,
            description:description,
            price:price,
            weight:weight,
            image:image,
            category:category,
        };
        const DataWithImage = new FormData();
        DataWithImage.append("name", updatedScrap.name);
        DataWithImage.append("description", updatedScrap.description);
        DataWithImage.append("price",updatedScrap.price);
        DataWithImage.append("weight",updatedScrap.weight);
        DataWithImage.append("image", updatedScrap.image); 
        DataWithImage.append("category",updatedScrap.category);

        axios.patch(`/adminapi/scrapwastedit/${id}`,DataWithImage)
        .then((response) => {
            console.log("Scrap Waste Updated Successfully",response.data)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "BioWaste updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            setScrapWaste(response.data);
        })
        .catch((error) => {
            console.error("Error updating in Scrap Waste",error);
        })
    }

    const deleteScrap = () => {
        axios.delete(`/adminapi/scrapwastedit/${id}`)
        .then((response) => { 
        console.log("Scrap waste deleted Successfully..!")
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Scrap category deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/admin/scrapwaste/')
        })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        console.log(file)
    }
    if (!scrapWaste) {
        return <p>Loading...</p>;
    }


return (
    
    <form className="max-w-2xl mx-auto p-8 mt-20 bg-opacity-60 bg-green-700 rounded-lg shadow-lg">
        <p>Scrap Waste ID: {scrapWaste.id}</p>
        <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Category:</label>
        <input
          type="text"
          id="category"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label >Weight:</label>
        <input
          type="text"
          id="weight"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          name="weight"
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label >Price:</label>
        <input
          type="text"
          id="price"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image">Image:</label>
        <input 
          type="file"
          name="image"
          id="image"
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          onChange={handleImageUpload}
        />
      </div>
      <button type="submit" 
      onClick={updateScrap}
      className="w-full px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-red-200">
        Update
      </button>
      <button
       onClick={deleteScrap}
       className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
          Delete
      </button>
    </form>
  );
};

export default EditScrap; 

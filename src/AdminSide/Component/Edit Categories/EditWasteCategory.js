import React, { useEffect, useState} from 'react'
import axios from '../../../utils/axios'
import Swal from "sweetalert2";
import { baseUrl } from "../../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";


const EditWasteCategory = () => {
  const { id } = useParams();
  const [wasteCategory, setWasteCategory] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWasteCategory();
  }, []);

  const fetchWasteCategory = () => {
    axios.get(`/adminapi/wastecatedit/${id}/`)
    .then((response) => {
      setWasteCategory(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setImage(response.data.image);
    })
    .catch((error) => {
      console.error("Error fetching Waste Category:", error);
    });
  };

  const updateWasteCategory = () => {
    const updatedWasteCategory = {
      ...wasteCategory,
      name:name,
      description:description,
      image:image
    };
    console.log(updatedWasteCategory);
    const DatasWithImage = new FormData();
    DatasWithImage.append("name", updatedWasteCategory.name);
    DatasWithImage.append("description", updatedWasteCategory.description);
    DatasWithImage.append("image", updatedWasteCategory.image);

    axios.patch(`/adminapi/wastecatedit/${id}/`, DatasWithImage)
    .then ((response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Waste category updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setWasteCategory(response.data);
    })
    .catch((error) => {
      console.error("Error updating category:",error);
    })
  }

   const deleteWasteCategory = () => {
    axios.
      delete(`/adminapi/wastecatedit/${id}`)
      .then((response) => {
        console.log("Waste category deleted Successfully");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Waste category deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/admin/wastecategory/')
      })
   };

   const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    console.log(file);
   
  };

  if (!wasteCategory) {
    return <p>Loading...</p>;
  }

return (
    <div className="max-w-2xl mx-auto p-8 mt-20 bg-opacity-60 bg-green-700 rounded-lg shadow-lg">
      <p> Waste Category ID: {wasteCategory.id}</p>
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
      onClick={updateWasteCategory}
      className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
        Update
      </button>
      <button
       onClick={deleteWasteCategory}
       className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
          Delete
      </button>
    </div>
  );
};

export default EditWasteCategory; 

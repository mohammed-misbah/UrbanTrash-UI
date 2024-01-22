import React, { useState, useEffect} from 'react'
import axios from '../../../utils/axios'
import Swal from "sweetalert2";
import { useParams, useNavigate } from 'react-router-dom';


const EditScrapCategory = () => {
  const { id } = useParams();
  const [scrapCategory, setScrapCategory] = useState('');
  const [name, setName] = useState("")
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchScrapCategory();
  }, [])

  const fetchScrapCategory = () => {
    axios.get(`/adminapi/scrapcategoryedit/${id}`)
    .then((response) => {
      setScrapCategory(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setImage(response.data.image);
    })
    .catch((error) => {
      console.error("Error fetching Waste Category:", error);
    });
  };


  const updateScrapCategory = () => {
    const updatedScrapCateogry = {
      ...scrapCategory,
      name:name,
      description:description,
      image:image
    };
    console.log(updatedScrapCateogry);
    const formDataWithImage = new FormData();
    formDataWithImage.append("name", updatedScrapCateogry.name);
    formDataWithImage.append("description", updatedScrapCateogry.description);
    formDataWithImage.append("image", updatedScrapCateogry.image);

    axios.patch(`/adminapi/scrapcategoryedit/${id}/`, formDataWithImage)
    .then ((response) => {
      console.log("Scrap category updated Successfully", response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Waste category updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setScrapCategory(response.data);
    })
    .catch((error) => {
      console.error("Error updating category:",error);
    })
  }
  console.log("Waste category updated Successfully:");
  
  const deletScrapCategory = () => {
    axios.delete(`/adminapi/scrapcategoryedit/${id}/`)
    .then((response) => {
      console.log("Scrap category deleted Successfully")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Waste category deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/adminapi/scrapcategory/')
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    console.log(file);
   
  };

  if (!scrapCategory) {
    return <p>Loading...</p>;
  }


return (
    <div className="max-w-2xl mx-auto p-8 mt-20 bg-green-700 rounded-lg shadow-lg">
      <p>Scrap Category ID: {scrapCategory.id}</p>
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
      onClick={updateScrapCategory}
      className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
        Update
      </button>
      <button type='submit'
      className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
      onClick={deletScrapCategory}>
        Delete
      </button>
    </div>
  );
};

export default EditScrapCategory; 

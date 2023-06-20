import React, { useState} from 'react'
import axios from '../../../utils/axios'
import Swal from "sweetalert2";


const AddWasteCategory = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      recyclable: false,
      image: '',
    });

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event) =>{
        const {name, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }))
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image:file,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const DatasWithImage = new FormData();
            DatasWithImage.append('name',formData.name);
            DatasWithImage.append('description', formData.description);
            DatasWithImage.append('recyclable', formData.recyclable);
            DatasWithImage.append('image', formData.image);

            const response = await 
                axios.post('adminapi/wastecategory/',DatasWithImage);
                setFormData ({
                    name: '',
                    description: '',
                    recyclable: false,
                    image: '',
                });
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "BioWaste added successfully",
                  showConfirmButton: false,
                  timer: 2000,
              });
                setCategories((prevCategories) => [...prevCategories, response.data]);
            } catch (error) {
                console.error(error);
              }
            console.log(formData,"category dataaaaaaaaaaaaaaas");
    
      };

return (
    <form style={{ maxWidth: '600px' }} className="mx-auto px-4 py-20 mt-24 bg-opacity-60 bg-green-800 rounded-lg shadow-md">
    <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-bold text-gray-800">Name:</label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          value={formData.name}
          name="name"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 font-bold text-gray-800">Description:</label>
        <input
          type="text"
          id="description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="recyclable" className="block mb-1 font-bold text-gray-800">Recyclable:</label>
        <input
          type="checkbox"
          id="recyclable"
          className="w-5 h-5 appearance-none bg-white border border-gray-300 rounded focus:outline-none checked:bg-red-700 checked:border-red-700"
          value={formData.recyclable}
          name="recyclable"
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block mb-1 font-bold text-gray-800">Image:</label>
        <input 
          type="file"
          name="image"
          id="image"
          className="inline-block py-2 px-4 bg-red-50 text-gray-900 border border-transparent rounded-lg text-sm font-medium leading-5 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onChange={handleImageChange}
        />
      </div>
       
      <button type="submit"className="w-full px-4 py-2 bg-green-900 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Add
      </button>
    </form>
  );
};

export default AddWasteCategory; 

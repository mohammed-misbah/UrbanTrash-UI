import React, { useEffect, useState} from 'react'
import axios from '../../../utils/axios'
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';

const AddScrap = () => {
    const [addscrap, setAddScrap] = useState([]);
    const [scraptype, setScrapType] = useState([]);
    const [scrapCat, setScrapCat] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      category: '',
      weight: '',
      price: '',
      image: '',
    });

    const {user} = useSelector((state) => state.user);

    useEffect (() => {
      fetchScrapCategory();
    },[user])

     const fetchScrapCategory = () => {
      axios.get('adminapi/scrapcategory')
      .then((response) => {
        const fetchScrap = response.data.map((scrap) => ({
          id:scrap.id,
          name: scrap.name,
        }))
        setScrapCat(fetchScrap);
      })
      .catch((error) => {
        console.error('Error fetching scrap Caaategory:', error);
      })
     }

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    

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
            DatasWithImage.append('weight', formData.weight);
            DatasWithImage.append('price', formData.price);
            DatasWithImage.append('image', formData.image);
            DatasWithImage.append('category',scraptype);

            const response = await 
                axios.post('adminapi/scrapwaste/',DatasWithImage);
                setFormData ({
                    name: '',
                    category: '',
                    description: '',
                    weight: '',
                    price: '',
                    image: '',
                });
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "ScrapWaste added successfully",
                  showConfirmButton: false,
                  timer: 2000,
              });
                setAddScrap((prevAddScrap) => [...prevAddScrap, response.data]);
            } catch (error) {
              console.error(error);
              }
    };

return (
    <form style={{ maxWidth: '600px' }} className="mx-auto px-4 py-20 mt-24 bg-opacity-60 bg-green-800 rounded-lg shadow-md"
    onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-bold text-gray-800">ScrapName:</label>
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
        <label htmlFor="name">Category:</label>
        <select  id="wastetype" value={scraptype}
          onChange={(e) => setScrapType(e.target.value)} >

            <option>Select Category</option>
                {scrapCat.map((category) =>(
              <option key={category.id} value={category.id} >
                {category.name}
              </option>
                ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="description">Description:</label>
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
        <label>Weight:</label>
        <input
          type="text"
          id="weight"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          value={formData.weight}
          name="weight"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label >Price:</label>
        <input
          type="text"
          id="price"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          value={formData.price}
          name="price"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image">Image:</label>
        <input 
          type="file"
          name="image"
          id="image"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          onChange={handleImageChange}
        />
      </div>
       
      <button type="submit" className="w-full px-4 py-2 bg-green-900 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Add
      </button>
    </form>
  );
};

export default AddScrap; 

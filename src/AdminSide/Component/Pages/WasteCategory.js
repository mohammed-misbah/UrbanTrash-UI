import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';


const WasteCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = 
        await axios
          .get('/adminapi/wastecategory/');
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(categories,'categorieeeeeeees is heeeeeeeeeere')

  const changeShow = () => {
    navigate('/addwastecategory/')
  };

  const redirectToWasteCategoryDetail = (id) => {
    navigate(`/editwastecategory/${id}`);
  };
  

  return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center bg-opacity-50 bg-green-900 rounded-md p-3">
        <div className="flex items-center">
          <h1 className="text-white">Waste Category</h1>
        </div>
        <button
          id="dropdownActionButton"
          className="bg-red-500 hover:bg-red-700 text-white rounded px-20 py-4 transition-colors duration-300"
          type="button"
          onClick={changeShow}
        >
          ADD Category
        </button>
      </div>
      <div className="bg-green-800 bg-opacity-80 p-8 rounded-t-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-4 px-6 text-white">Id</th>
                <th className="py-4 px-6 text-white">image</th>
                <th className="py-4 px-6 text-white">Name</th>
                <th className="py-4 px-6 text-white">Description</th>
                <th className="py-4 px-6 text-white">Recyclable</th>
                <th className="py-4 px-6 text-white">Edit</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="py-2 px-4">{category.id}</td>
                  <td className="py-2 px-4">
                    {category.image && <img src={category.image} alt="image" className="w-16 h-16 object-cover rounded" />}
                  </td>
                  <td className="py-2 px-4">{category.name}</td>
                  <td className="py-2 px-4">{category.description}</td>
                  <td className="py-2 px-4">{category.recyclable ? 'yes' : 'no'}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => redirectToWasteCategoryDetail(category.id)} className="text-blue-600 hover:underline">
                      Edit Waste
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

export default WasteCategory;

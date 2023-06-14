import axios from '../../../utils/axios'
import React, { useState } from "react";
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


const BioWaste = () => {
  const [biowaste, setBioWaste] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  useEffect (() =>{
    fetchBioWaste();
    fetchCategories();
  },[]);

  const fetchBioWaste = async () => {
    try {
      const response = 
        await axios
          .get('/adminapi/biowastelist/');
      setBioWaste(response.data);
      console.log(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };
  console.log(biowaste,"biooooooooooo waaaaaaaaaaaaste");

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/adminapi/wastecategory/');
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(categories,"biooooooooooo waaaaaaaaaaaaste");

  const changeShow = () => {
    navigate('/addwaste/')
  }

  const redirectToWasteDetail = (id) => {
    navigate(`/editwaste/${id}`)
  }

  return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center bg-opacity-50 bg-green-900 rounded-md p-3">
         <h1 className="text-white right-40">Bio Wastes</h1>
          <button
            id="dropdownActionButton"
            className="bg-red-500 hover:bg-red-700 text-white rounded px-20 py-4 transition-colors duration-300"
            type="button"
            onClick={changeShow}
          >
            ADD Waste
          </button>
        </div>
        {/* <h1>Bio Wastes</h1> */}
      <div className="bg-green-800 bg-opacity-80 p-10 rounded-t-md">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-white">Id</th>
              <th className="py-2 px-4 text-white">Image</th>
              <th className="py-2 px-4 text-white">WasteName</th>
              <th className="py-2 px-4 text-white">Category</th>
              <th className="py-2 px-4 text-white">Description</th>
              <th className="py-2 px-4 text-white">Weight</th>
              <th className="py-2 px-4 text-white">Price</th>
              <th className="py-2 px-4 text-white">Edit</th>
            </tr>
          </thead>
          <tbody>
            {biowaste.map((wastes) => ( 
              
            <tr key={wastes.id}>
              {console.log(wastes,"waaaste list enteeeeered")}
              <td className="py-2 px-4">{wastes.id}</td>
              <td className="py-2 px-4">{wastes.image && <img src={wastes.image} alt='biowateimage' className="w-16 h-16 object-cover rounded"/>}</td>
              <td className="py-2 px-4">{wastes.name}</td> 
              <td className="py-2 px-4">{wastes.category}</td>  
              <td className="py-2 px-4">{wastes.description}</td> 
              <td className="py-2 px-4">{wastes.weight}</td> 
              <td className="py-2 px-4">{wastes.price}</td>       
              <td className="py-2 px-4">
                <div className="flex justify-center">
              <button 
                    onClick={() => redirectToWasteDetail(wastes.id)}
                    className="flex justify-center">
                    EditWaste
              </button>
              </div>
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

export default BioWaste;

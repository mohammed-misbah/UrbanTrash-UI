
import axios from '../../../utils/axios'
import React, { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrapWaste = () => {
  const [scrapwaste, setScrapWaste] = useState([]);
  const navigate = useNavigate();


  useEffect (() => {
    fetchScrapWaste();
  },[]);

  const fetchScrapWaste = async () => {
    try {
      const resoponse = 
      await axios.get('adminapi/scrapwastelist/');
      setScrapWaste(resoponse.data);
      console.log(resoponse.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const changeShow = () => {
    navigate('/admin/scrapwaste/add/')
  }

  const redirectToScrapDetail = (id) => {
    navigate(`/admin/scrapwaste/edit/${id}`);
  }

return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-opacity-50 bg-green-900 rounded-md p-3">
        <h1 className="text-white right-40">Scrap Wastes</h1>
        <button
          id="dropdownActionButton"
          className="bg-red-700 hover:bg-red-500 text-white rounded px-20 py-4 transition-colors duration-300"
          type="button"
          onClick={changeShow}
        >
          Add Scrap
        </button>
      </div>
      <div className="bg-green-800 bg-opacity-60 p-10 rounded-t-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-6 px-14 text-white">Id</th>
                <th className="py-6 px-14 text-white">Image</th>
                <th className="py-6 px-14 text-white">Category</th>
                <th className="py-6 px-14 text-white">Scrap Name</th>
                <th className="py-6 px-14 text-white">Description</th>
                <th className="py-6 px-14 text-white">Weight</th>
                <th className="py-6 px-14 text-white">Price</th>
                <th className="py-6 px-14 text-white">Edit</th>
              </tr>
            </thead>
            <tbody>
              {scrapwaste.map((scrap) => (
                <tr key={scrap.id}>
                  <td className="py-8 px-20">{scrap.id}</td>
                  <td className="py-8 px-20">
                    {scrap.image && (
                      <img src={scrap.image} alt="scrapimage" className="w-16 h-16 object-cover rounded" />
                    )}
                  </td>
                  <td className="py-8 px-20">{scrap.category}</td>
                  <td className="py-8 px-20">{scrap.name}</td>
                  <td className="py-8 px-20">{scrap.description}</td>
                  <td className="py-8 px-20">{scrap.weight}</td>
                  <td className="py-8 px-20">{scrap.price}</td>
                  <td className="py-8 px-20">
                    <div className="flex justify-center">
                      <button
                        onClick={() => redirectToScrapDetail(scrap.id)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white rounded px-10 py-2.5 transition-colors duration-300">
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

export default ScrapWaste;

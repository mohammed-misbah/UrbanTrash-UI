import React, { Fragment, useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../utils/constants';

const WastePriceList = () => {
    const [wastes, setWastes] = useState('')

    const navigate = useNavigate('');
    useEffect (() => {
        fetchBioWaste();
    },[]);

    const fetchBioWaste = async () => {
        try {
            const response = await axios.get('adminapi/biowastelist/');
             setWastes(response.data)
             console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (

    <Fragment>
    {Array.isArray(wastes) ? (
      wastes.map((waste) => (
        <div className="flex flex-col items-center mt-10 rounded-lg border-2 border-gray-300 max-w-4xl mx-auto">
          <div className="h-48 bg-gray-200 w-full md:w-1/3">
            <img src={baseUrl + waste.image} alt="" className="w-full h-full object-contain mx-auto" />
          </div>
          <div className="textContainer text-center py-6 md:py-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Bio Waste: <span className="text-green-600">{waste.name}</span></h2>
            </div>
            <div>
              <h2 className="text-xl text-green-600 mb-4">Weigth: <span>{waste.weight}</span></h2>
            </div>
            <div>
              <h2><span className="text-green-600">Best Use:</span> {waste.category}</h2>
            </div>
          </div>
          <div className="additionalInfo text-center py-6 md:py-10">
            <h2 className="text-4xl font-bold mb-4">Rs: {waste.price}</h2>
            <button className="button mt-4 px-10 py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white font-bold">
              Book Now
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No wastes found.</p>
    )}
  </Fragment>
  
  )
}

export default WastePriceList

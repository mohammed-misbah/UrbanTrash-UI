import React from "react";
import Cards from '../../images/waste 1.jpeg'

const Card = () => {
    return (
        <div className="border border-gray-300 rounded-lg p-6 shadow transition-shadow duration-300 hover:shadow-md flex flex-col items-center text-center w-80 h-96 bg-white mt-24 mb-24">
        <img className="w-4/5 h-40 rounded-md mb-4" src={Cards} alt="Card" />
        <div>
          <h3 className="text-2xl font-bold mb-4">Reduce, reuse, recycle</h3>
          <p className="text-base text-gray-600">Recycling plays a crucial role in waste management by transforming discarded materials into new products or raw materials. By diverting waste from landfills and utilizing recycled materials, we conserve resources, reduce the extraction of virgin materials, and decrease the energy and emissions associated with manufacturing.</p>
        </div>
      </div>
      
    );
  };
  
  export default Card;
  
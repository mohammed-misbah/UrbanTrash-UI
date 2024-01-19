import React from 'react'
import ScrapPriceList from './ScrapPriceList'
import WastePriceList from './WastePriceList'
import Navbar from '../Navbar/Navbar'

const getPriceList = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap mt-16">
           <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <WastePriceList />
           </div>
                 <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <ScrapPriceList />
                </div>
           </div>

      </div>

  )
}

export default getPriceList

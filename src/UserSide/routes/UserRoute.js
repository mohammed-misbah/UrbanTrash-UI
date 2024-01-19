import { Routes, Route } from 'react-router-dom';

import Home from '../../UserSide/Component/Home'
import Login from '../../UserSide/Pages/Login';
import Signin from '../../UserSide/Pages/Signin'
import Otp from '../../UserSide/Pages/Otp'
import User from '../../UserSide/Component/UserPage/User'
import PickupDetails from '../../UserSide/Component/UserPage/PickupDetails'
import Address from '../../UserSide/Component/UserPage/Address'
import ScrapPickup from '../../UserSide/Component/ScrapPickup/ScrapPickup'
import PriceList from '../../UserSide/Component/PriceLists/PriceList'
import Contact from '../../UserSide/Component/Contact'
import WastePickup from '../../UserSide/Component/WastePickup/WastePickup'
import Sidebar from '../../UserSide/Component/UserPage/Sidebar/Sidebar';


const UserLayoutWithSidebar = () => {
  return (
      <>
        <Sidebar />
        <Routes>
          <Route path="/address" element={<Address />} />
          <Route path="/pickupdetails" element={<PickupDetails />} />
          <Route path="/profile" element={<User />} />
        </Routes>
      </>
  )
}

function UserLayout() {
  
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signin />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/wastepickup" element={<WastePickup />} />
        <Route path="/scrappickup" element={<ScrapPickup />} />
        <Route path='/pricelist' element={<PriceList />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/*' element={<UserLayoutWithSidebar/>}/>
    </Routes>
  );
}

export default UserLayout;


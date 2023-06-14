import React, {useState,useEffect} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './UserSide/Component/Home';
import Login from './UserSide/Pages/Login';
import Signin from './UserSide/Pages/Signin';
import User from './UserSide/Component/UserPage/User';
import PickupDetails from './UserSide/Component/UserPage/PickupDetails';
import Sidebar from './UserSide/Component/UserPage/Sidebar/Sidebar';
import Address from './UserSide/Component/UserPage/Address'
import ScrapPickup from './UserSide/Component/ScrapPickup/ScrapPickup';
import PriceList from './UserSide/Component/PriceLists/PriceList';
import Contact from './UserSide/Component/Contact';
import WastePickup from './UserSide/Component/WastePickup/WastePickup';
// import Navbar from './UserSide/components/UserPages/Navbar/Navbar';


import Users from './AdminSide/Component/Pages/Users';
import WastePickupDetails from './AdminSide/Component/Pages/PickupDetails/WastePickupDetails';
import ScrapPickupDetails from './AdminSide/Component/Pages/PickupDetails/ScrapPickupDetails';

import WasteCategory from './AdminSide/Component/Pages/WasteCategory';
import ScrapCategory from './AdminSide/Component/Pages/ScrapCategory';
import Dashboard from './AdminSide/Component/Pages/Dashboard';
import AdminLogin from './AdminSide/AdminLogin';
import AdminSidebar from './AdminSide/AdminSidebar';
import AddWasteCategory from './AdminSide/Component/Add Categories/AddWasteCategory';
import AddScrapCategory from './AdminSide/Component/Add Categories/AddScrapCategory';
import ScrapWaste from './AdminSide/Component/Scrap Waste/ScrapWaste';
import BioWaste from './AdminSide/Component/Bio Waste/BioWaste';
import AddWaste from './AdminSide/Component/Add Waste/AddWaste';
import AddScrap from './AdminSide/Component/Add Scrap/AddScrap';
import EditScrapCategory from './AdminSide/Component/Edit Categories/EditScrapCategory';
import EditWasteCategory from './AdminSide/Component/Edit Categories/EditWasteCategory';
import EditWaste from './AdminSide/Component/Edit Waste/EditWaste';
import EditScrap from './AdminSide/Component/Edit Scrap/EditScrap';
import WastePickupUpdate from './AdminSide/Component/Pages/PickupDetails/WastePickupUpdate';
import ScrapPickupUpdate from './AdminSide/Component/Pages/PickupDetails/ScrapPickupUpdate';

// import AdminComponent from './AdminComponent';
import {useDispatch} from "react-redux"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from './utils/axios';
import { setUserDetails } from './redux/usernameSlice';

function App() {
  const [user, setUserState] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) {

      console.log("no");
    } else {
      console.log(token);
      axios
        .get('api/verify_token/', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setUserState(response.data.user)
          dispatch(setUserDetails(response.data.user));
        });
    }
  },[]);
  
  return (
      <Routes>
        <Route path='*' element={<AppLayout />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signin />} />
        <Route path="/wastepickup" element={<WastePickup/>}/>
        <Route path="/scrappickup" element={<ScrapPickup/>}/>
        <Route path='/pricelist' element={<PriceList/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/pickupdetails" element={<><Sidebar /><PickupDetails /></>} />
        <Route path='/address' element={<><Sidebar /><Address/></>}/>
        <Route path="/user" element={<><Sidebar /><User /></>} />
      </Routes>
  );
}


function AppLayout() {
  return (

                <Routes>
                  <Route path='/admin' element={<AdminLogin/>} />
                  <Route path='/dashboard' element={<><AdminSidebar/><Dashboard/></>} />
                  <Route path='/users' element={<><AdminSidebar/><Users /></>} />
                  <Route path='/wastecategory' element={<><AdminSidebar/><WasteCategory /></>} />
                  <Route path='/scrapcategory' element={<><AdminSidebar/><ScrapCategory /></>} />
                  <Route path='/addwastecategory' element={<><AdminSidebar/><AddWasteCategory /></>} />
                  <Route path='/biowaste' element={<><AdminSidebar/><BioWaste /></>} />
                  <Route path='/scrapwaste' element={<><AdminSidebar/><><AdminSidebar/><ScrapWaste /></></>} />
                  <Route path='/editwastecategory/:id' element={<><AdminSidebar/><EditWasteCategory/></>} />
                  <Route path='/editscrapcategory/:id' element={<><AdminSidebar/><EditScrapCategory/></>} />
                  <Route path='/addwaste' element={<><AdminSidebar/><AddWaste/></>} />
                  <Route path='/addscrap' element={<><AdminSidebar/><AddScrap/></>} />
                  <Route path='/editwaste/:id' element={<><AdminSidebar/><EditWaste/></>} />
                  <Route path='/editscrap/:id' element={<><AdminSidebar/><EditScrap/></>} />
                  <Route path='/wasteupdate/:id' element={<><AdminSidebar/><WastePickupUpdate /></>} />
                  <Route path='/wastepickuplist' element={<><AdminSidebar/><WastePickupDetails /></>} />
                  <Route path='/scrapickuplist' element={<><AdminSidebar/><ScrapPickupDetails /></>} />
                  <Route path='/scrapupdate/:id' element={<><AdminSidebar/><ScrapPickupUpdate /></>} />
                  <Route path="/addscrapcategory" element={<><AdminSidebar/><AddScrapCategory /></>} />
                </Routes>

      
  );
}

export default App;





import AdminLogin from '../../AdminSide/AdminLogin';
import AdminDashboard from '../../AdminSide/Component/Pages/Dashboard';
import User from '../../AdminSide/Component/Pages/Users';
import WasteCategory from '../../AdminSide/Component/Pages/WasteCategory';
import AddWasteCategory from '../../AdminSide/Component/Add Categories/AddWasteCategory';
import EditWasteCategory from '../../AdminSide/Component/Edit Categories/EditWasteCategory';
import ScrapCategory from '../../AdminSide/Component/Pages/ScrapCategory';
import AddScrapCategory from '../../AdminSide/Component/Add Categories/AddScrapCategory';
import EditScrapCategory from '../../AdminSide/Component/Edit Categories/EditScrapCategory';
import BioWaste from '../../AdminSide/Component/Bio Waste/BioWaste';
import ScrapWaste from '../../AdminSide/Component/Scrap Waste/ScrapWaste';
import AddWaste from '../../AdminSide/Component/Add Waste/AddWaste';
import AddScrap from '../../AdminSide/Component/Add Scrap/AddScrap';
import EditWaste from '../../AdminSide/Component/Edit Waste/EditWaste';
import EditScrap from '../../AdminSide/Component/Edit Scrap/EditScrap';
import WastePickupDetails from '../../AdminSide/Component/Pages/PickupDetails/WastePickupDetails';
import ScrapPickupDetails from '../../AdminSide/Component/Pages/PickupDetails/ScrapPickupDetails';
import ScrapPickupUpdate from '../../AdminSide/Component/Pages/PickupDetails/ScrapPickupUpdate';
import WastePickupUpdate from '../../AdminSide/Component/Pages/PickupDetails/WastePickupUpdate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSidebar from '../../AdminSide/AdminSidebar'


const AdminLayoutWithSidebar = () => {
  return (
    <>
      <AdminSidebar />
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<User />} />
 
        {/* Waste Category, Add and Edit */}
        <Route path='/wastecategory' element={<WasteCategory />} />
        <Route path='/wastecategory/add' element={<AddWasteCategory />} />
        <Route path='/wastecategory/edit/:id' element={<EditWasteCategory/>} />

        {/* Scrap Category, Add and Edit */}
        <Route path='/scrapcategory' element={<ScrapCategory />} />
        <Route path="/scrapcategory/add" element={<AddScrapCategory />} />
        <Route path='/scrapcategory/edit/:id' element={<EditScrapCategory/>} />

        {/* Bio Waste, Add, Edit, Update and List */}
        <Route path='/biowaste' element={<BioWaste />} />
        <Route path='/addwaste' element={<AddWaste/>} />
        <Route path='/editwaste/:id' element={<EditWaste/>} />
        <Route path='/wasteupdate/:id' element={<WastePickupUpdate />} />
        <Route path='/wastepickuplist' element={<WastePickupDetails />} />

        {/* Scrap Waste, Add, Edit, Update and List */}
        <Route path='/scrapwaste' element={<ScrapWaste />} />
        <Route path='/addscrap' element={<AddScrap/>} />
        <Route path='/editscrap/:id' element={<EditScrap/>} />
        <Route path='/scrapupdate/:id' element={<ScrapPickupUpdate />} />
        <Route path='/scrapickuplist' element={<ScrapPickupDetails />} />

      </Routes>
    </>
    
  );
};

function AdminLayout() {
  return (
    <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/*" element={<AdminLayoutWithSidebar />} />
    </Routes>
  );
}

export default AdminLayout;

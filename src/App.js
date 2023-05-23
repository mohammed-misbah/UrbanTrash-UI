import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from '../src/UserSide/components/Home';
import Login from '../src/UserSide/pages/Login';
import Signin from '../src/UserSide/pages/Signin';
import Category from '../src/UserSide/components/Category';
import rootReducer from './redux/rootreducer';
import User from '../src/UserSide/components/UserPages/User';
import Dashboard from '../src/UserSide/components/UserPages/Dashboard';
import Order from '../src/UserSide/components/UserPages/Order';
import Sidebar from '../src/UserSide/components/UserPages/Sidebar/Sidebar';
import Address from './UserSide/components/UserPages/Address';
// import Navbar from './UserSide/components/UserPages/Navbar/Navbar';


import Users from './AdminSide/Component/pages/Users';
import Orders from '../src/AdminSide/Component/pages/Orders';
import Categories from '../src/AdminSide/Component/pages/Categories';
import Product from '../src/AdminSide/Component/pages/Product';
import AdminDashboard from './AdminSide/Component/pages/AdminDashboard'
import AdminLogin from './AdminSide/Component/AdminLogin';
import AdminSidebar from './AdminSide/Component/AdminSidebar';
import Booking from './UserSide/components/Booking';


const store = createStore(rootReducer);
function App() {
  return (
    <Provider store={store}>
      <Routes>
        {/* <Navbar/> */}
      <Route path='/*' element={<AppLayout />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/category" element={<Category />} />
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/user" element={<><Sidebar /><User /></>} />
        <Route path="/dashboard" element={<><Sidebar /><Dashboard /></>} />
        <Route path="/order" element={<><Sidebar /><Order /></>} />
        <Route path='/address' element={<><Sidebar/><Address/></>}/>
      </Routes>
      </Provider>
  );
}


function AppLayout() {
  return (

    <div className="App">
      <div className="AppGlass">
        
        <Routes>
        <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admindashboard' element={<><AdminSidebar/><AdminDashboard/></>}/>
          <Route path='/users' element={<><AdminSidebar /><Users /></>} />
          <Route path='/orders' element={<><AdminSidebar /><Orders /></>} />
          <Route path='/categories' element={<><AdminSidebar /><Categories /></>} />
          <Route path='/products' element={<><AdminSidebar /><Product /></>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;





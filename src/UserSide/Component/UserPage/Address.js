import React,{useEffect, useState} from 'react'
import Footer from '../Footer/Footer'
import axios from '../../../utils/axios';
// import { addressList } from '../../../utils/constants';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar/Sidebar';


const Address = () => {

  const [addedAddress, setAddedAddress] = useState([]);
  // const {id} = useSelector ((state) =>state.id)
  const {user} = useSelector((state) =>state.user);

  // let userId;
  // userId= user?.id;
  // console.log(user,userId,'loged userrrr');

  useEffect (() => {
    fetchAddress();
  },[user]);

  const fetchAddress = () => {
    const id = user?.id
    axios.get(`api/listAddress/${id}`)
    .then((response) => {
      console.log(response);
      const fetchedAddress = response.data.map((address) => ({
        id: address.id, 
        firstname: address.firstname,
        lastname: address.lastname,
        email: address.email,
        phone: address.phone,
        address1: address.address1,
        address2: address.address2,
        pincode: address.pincode,
      }));
      setAddedAddress(fetchedAddress);
    })
    .catch((error) => {
      console.error("Error fetching addresses:", error);
    });
  }

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    user:user?.id,
    firstname:"",
    lastname: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    pincode: "",
  });

  const handleToggleAddAddress = () =>{
    setShowAddAddress(!showAddAddress);
  }

  const handleChangeNewAddress = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value, user: user?.id});
  };
  
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (user) {
    axios
      .post("api/addAddress", newAddress)
      .then((response) =>{
        const addedAddress = response.data;
        setAddedAddress([...addedAddress, addedAddress]);
        setNewAddress({});
      })
      .catch((error) => {
        console.error("Error adding address:", error);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Address added Successfully.!',
          timer:1500
        });
      });
    }
    
    };
    
  
return (
  // <div className="inline-flex items-center justify-center h-20 w-60 border-t border-gray-700"></div>
<div className="w-[89vh] md:ml-auto md:mr-auto ml-10 mr-10 mt-11">  
{addedAddress.map((address) => (
    <div key={address.user}  className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-3">Added Address</h2>
      <h2 className="mb-2.5">{address.firstname} {address.lastname} </h2>
      <p className="mb-2"><span className='font-bold'>Email:</span> {address.email}</p>
      <p className="mb-2"><span className='font-bold'>Phone:</span> {address.phone}</p>
      <p className="mb-2"><span className='font-bold'>Address1:</span> {address.address1}</p>
      <p className="mb-2"><span className='font-bold'>Address2:</span> {address.address2}</p>
      <p className="mb-2"><span className='font-bold'>Pincode:</span> {address.pincode}</p>
    </div>
  ))}

          {showAddAddress ? (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              {/* First name field */}
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                name="firstname"
                value={newAddress.firstname}
                onChange={handleChangeNewAddress}
                placeholder="First Name"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
        
              {/* Email field */}
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={newAddress.email}
                onChange={handleChangeNewAddress}
                placeholder="Enter an email"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
        
              {/* Address 1 field */}
              <label className="block mb-1 text-sm">Address1</label>
              <input
                type="text"
                name="address1"
                value={newAddress.address1}
                onChange={handleChangeNewAddress}
                placeholder="Enter Address 1"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
        
              {/* Pin code field */}
              <label className="block mb-1 text-sm">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleChangeNewAddress}
                placeholder="Pin Code"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
            </div>
        
            <div className="w-full">
              {/* Last name field */}
              <label className="block mb-1 text-sm">Lastname</label>
              <input
                type="text"
                name="lastname"
                value={newAddress.lastname}
                onChange={handleChangeNewAddress}
                placeholder="Last Name"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
        
              {/* Phone field */}
              <label className="block mb-1 text-sm">Phone</label>
              <input
                type="phone"
                name="phone"
                value={newAddress.phone}
                onChange={handleChangeNewAddress}
                placeholder="Enter phone"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
        
              {/* Address 2 field */}
              <label className="block mb-1 text-sm">Address 2</label>
              <input
                type="text"
                name="address2"
                value={newAddress.address2}
                onChange={handleChangeNewAddress}
                placeholder="Enter Address 2"
                className="w-full md:w-80 border border-gray-300 text-sm rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
            </div>
          </div>

  

        {/* Save button */}
        <div className="flex justify-end">
          <button onClick={handleAddAddress} className="mr-5 bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-10 rounded">
            Save
          </button>

          {/* Cancel button */}
          <button onClick={handleToggleAddAddress} className="ml-2 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-10 rounded">
            Cancel
          </button>
        </div>
    </div>
  ) : (
    <div className="flex justify-end">
      <button onClick={handleToggleAddAddress} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded mt-20">
        Add Address
      </button>
    </div>
  )}
</div>


      );
    };
    



export default Address;



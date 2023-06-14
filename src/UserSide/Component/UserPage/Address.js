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

  <div className={`sidebar ${showAddAddress ? 'fixed top-20 left-20 w-full md:w-500px h-auto bg-gray-200 p-5 rounded-lg' : 'flex justify-center flex-col p-5 bg-gray-200 w-full md:w-500px h-400px mx-auto mt-20 rounded-lg gap-6'}`}>
  {addedAddress.map((address) => (
    <div key={address.user} className="border border-gray-600 p-5">
      <h2 className="text-xl font-bold mb-3">Added Address</h2>
      <p className="mb-1">
        Name: {address.firstname} {address.lastname}
      </p>
      <p className="mb-1">Email: {address.email}</p>
      <p className="mb-1">Phone: {address.phone}</p>
      <p className="mb-1">Address1: {address.address1}</p>
      <p className="mb-1">Address2: {address.address2}</p>
      <p className="mb-1">Pincode: {address.pincode}</p>
    </div>
  ))}

  {showAddAddress ? (
    <div className="bg-gray-100 p-5 rounded-lg">
      <div className="flex flex-wrap gap-6">
        <div className="w-full md:w-1/2">
          {/* First name field */}
          <input
            type="text"
            name="firstname"
            value={newAddress.firstname}
            onChange={handleChangeNewAddress}
            placeholder="First Name"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600 mb-3"
          />

          {/* Email field */}
          <input
            type="email"
            name="email"
            value={newAddress.email}
            onChange={handleChangeNewAddress}
            placeholder="Enter an email"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600 mb-3"
          />

          {/* Address 1 field */}
          <input
            type="text"
            name="address1"
            value={newAddress.address1}
            onChange={handleChangeNewAddress}
            placeholder="Enter Address 1"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600 mb-3"
          />

          {/* Pin code field */}
          <input
            type="text"
            name="pincode"
            value={newAddress.pincode}
            onChange={handleChangeNewAddress}
            placeholder="Pin Code"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600"
          />
        </div>

        <div className="w-full md:w-1/2">
          {/* Last name field */}
          <input
            type="text"
            name="lastname"
            value={newAddress.lastname}
            onChange={handleChangeNewAddress}
            placeholder="Last Name"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600 mb-3"
          />

          {/* Phone field */}
          <input
            type="phone"
            name="phone"
            value={newAddress.phone}
            onChange={handleChangeNewAddress}
            placeholder="Enter phone"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600 mb-3"
          />

          {/* Address 2 field */}
          <input
            type="text"
            name="address2"
            value={newAddress.address2}
            onChange={handleChangeNewAddress}
            placeholder="Enter Address 2"
            className="w-full bg-gray-300 py-2 px-3 placeholder-gray-600"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {/* Save button */}
        <button onClick={handleAddAddress} className="w-1/2 md:w-auto bg-green-500 py-2 px-4 text-white rounded-lg mr-2">
          Save
        </button>

        {/* Cancel button */}
        <button onClick={handleToggleAddAddress} className="w-1/2 md:w-auto bg-red-500 py-2 px-4 text-white rounded-lg">
          Cancel  
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center mt-4">
      <button onClick={handleToggleAddAddress} className="w-1/2 md:w-auto bg-green-500 py-2 px-4 text-white rounded-lg">
        Add Address
      </button>
    </div>
  )}
</div>


      );
    };
    



export default Address;



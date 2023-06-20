import React,{ useState, useEffect } from 'react';
import avatar from '../../images/avatar-profile.png'
import axios from '../../../utils/axios';
// import Footer from './Footer/Footer';
import Cookies from 'js-cookie';
// import { verifyToken } from '../../../utils/constants';



export default function ProfileDetails() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  // const [profile_picture, setProfilePicture] = useState('');

  useEffect(() => {
    const token = Cookies.get('jwt');
    if 
    (token) {
      axios
        .get('api/verify_token/', {
          headers: {
            Authorization: `${token}`},
        })
        .then((response) => {
          console.log(response);
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setPhone(response.data.user.phone_number);
          // setProfilePicture(response.data.user.profile_picture)
        });
    }
  }, []);

    return (
<div className="container mx-auto py-10 mt-20">
  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-lg mb-8">
    <div className="text-center mr-8">
      <img src={avatar} className="w-24 h-24 rounded-full object-cover mx-auto" alt="profile" />
      <h2 className="text-lg text-gray-500 mt-2">{name}</h2>
    </div>
    <div className="w-full max-w-md">
                <form className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label className="text-gray-700">Name:</label>
                <input className="input" type="text" value={name} name="name" />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Email:</label>
                <input className="input" type="email" value={email} name="email" />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Phone Number:</label>
                <input className="input" type="tel" value={phone_number} name="phone_number" />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Address:</label>
                <input className="input" type="text" defaultValue="Kasaragod, Kerala" name="address" />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Profile Picture:</label>
                <div className="relative border-dashed border-2 border-gray-400 p-4 rounded-md">
                <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" name="profile_picture" />
                <span className="text-gray-500">Click to upload or drag and drop an image</span>
                </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Save</button>
            </form>

    </div>
  </div>
</div>



    )
  };




  
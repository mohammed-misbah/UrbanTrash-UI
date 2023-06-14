import axios from '../../../utils/axios'
import React, { useState } from "react";
import { useEffect } from 'react';

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/adminapi/userlist'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const UserStatus = async (userID, isActive) => {

    try{
      let response;
      if (isActive){
        response = axios.post(`/adminapi/unblock_user/${userID}/Status`);
      }else{
        response = axios.post(`/adminapi/block_user/${userID}/Status`);
      }
      const updateUser = response.data;
      setUsers(prevUsers => 
        prevUsers.map((user) =>
          user.id === userID ? { ...user, isActive: !user.isActive } : user
        )
      );  
    } catch (error) {
      console.error('Error in your user status', error)
    }
  };

  return (
    <div className="flex flex-col">
        <div className="bg-green-800 bg-opacity-80 p-8 rounded-t-md mt-20">
        <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead>
                <tr>
                <th className="py-4 px-6 text-white">Id</th>
                <th className="py-4 px-6 text-white">Name</th>
                <th className="py-4 px-6 text-white">Email</th>
                <th className="py-4 px-6 text-white">Phone</th>
                <th className="py-4 px-6 text-white">Is Active</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>   
                <td className="py-2 px-4">{user.phone}</td>         
                <td className="py-2 px-4">
                
                <button className="text-blue-600 hover:underline"
                onClick={() => UserStatus(user.id)}>
                        {user.isActive ? 'Block' : 'Unblock'}
                </button>
        
                </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        </div>
  );
};
export default User;

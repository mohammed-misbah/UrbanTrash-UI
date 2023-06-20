import axios from '../../../utils/axios'
import React, { useState } from "react";
import { useEffect } from 'react';

const User = () => {
  const [users, setUsers] = useState([])
  const [block, setBlock] = useState(false);
  
  useEffect(() => {
    axios
      .get('adminapi/userlist')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleBlockUser = (id) => {
    axios
      .patch(`/adminapi/block_user/${id}/`)
      .then((response) => {
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              is_active: false,
            };
          } 
          return user;
        });
        setUsers(updatedUsers);
        setBlock(true);
      })
      .catch((error) => console.error(error));
  };

  const handleUnBlockUser = (id) => {
    axios
    .patch(`adminapi/unblock_user/${id}/`)
    .then((response) => {
      const updatedUsers = users.map ((user) => {
        if (user.id === id) {
          return {
            ...user,
            is_active: true,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setBlock(false);
    })
    .catch((error) => console.error(error));
  }

  return (
    <div className="flex flex-col">
      <div className="bg-green-800 bg-opacity-60 p-8 rounded-t-md mt-20">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-6 px-14 text-white">ID</th>
                <th className="py-6 px-14 text-white">Name</th>
                <th className="py-6 px-14 text-white">Email</th>
                <th className="py-6 px-14 text-white">Phone</th>
                <th className="py-6 px-14 text-white">Status</th>
                <th className='py-6 px-14 text-white'>Is Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-8 px-32">{user.id}</td>
                  <td className="py-8 px-32">{user.name}</td>
                  <td className="py-8 px-32">{user.email}</td>
                  <td className="py-8 px-32">{user.phone}</td>
                  <td className="py-8 px-32">
                    {user.is_active ? (
                      <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-6 text-xs rounded py-2  inline-block  text-center  font-bold uppercase text-white">
                        Active
                      </span> 
                      ) : ( 
                      <span className="bg-gradient-to-tl from-red-600 to-lime px-5 text-xs rounded py-2  inline-block  text-center font-bold uppercase text-white">
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="py-8 px-32">
                    {user.is_active ? (
                      <button className="bg-red-600 hover:bg-red-500 text-white rounded px-8 py-2.5 transition-colors duration-300" 
                        onClick={() => handleBlockUser(user.id)}>
                        Block
                      </button>
                    ) : (
                      <button className="bg-green-600 hover:bg-green-500 text-white rounded px-8 py-2.5 transition-colors duration-300" 
                        onClick={() => handleUnBlockUser(user.id)}>
                        Unblock
                      </button>
                    )}
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

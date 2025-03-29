import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3001/users/";

const Read = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  
      // Ensure toast runs AFTER state update
      setTimeout(() => {
        toast.success("Successfully Deleted!", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
    } catch (error) {
      toast.error("Error in deleting", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold mb-6">User List</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Age: {user.age}</p>

              <div className="mt-4 flex justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  onClick={() => deleteHandler(user._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/update/${user._id}`}
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No users found</p>
        )}
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default Read;

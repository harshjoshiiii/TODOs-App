import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3001/users";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setUser(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const updateHandler = async () => {
    try {
      await axios.patch(`${API_URL}/${id}`, user);

      toast.success("Successfully updated!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/all"), 3000);
    } catch (error) {
      toast.error("Error updating user!", {
        position: "top-right",
        autoClose: 3000,
      });

      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100 overflow-hidden fixed inset-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Update User</h2>

            <div className="flex flex-col gap-4">
              {/* Name Input */}
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Name"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Email Input */}
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Age Input */}
              <input
                type="number"
                value={user.age}
                onChange={(e) => setUser((prev) => ({ ...prev, age: e.target.value }))}
                placeholder="Age"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Update Button */}
              <button
                onClick={updateHandler}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition duration-300"
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>

       <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              style={{
                zIndex: 99999, // Ensures it's above other elements
                marginTop: "80px", // Moves the toast a bit down from the top
              }}
            />
    </div>
  );
};

export default Update;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import myImage from "../geuHome.jpg"; // Import the background image

const API_URL = "http://localhost:3001/users";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/`, formData);
      toast.success("Successfully added!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/all"), 3000);
      setFormData({ name: "", email: "", age: "" });
    } catch (error) {
      toast.error("Error adding user. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100 overflow-hidden fixed inset-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${myImage})` }}
      ></div>

      {/* Form Overlay */}
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Create User</h2>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            {/* Name Input */}
            <input
              type="text"
              placeholder="Enter your name"
              onChange={changeHandler}
              name="name"
              value={formData.name}
              required
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              onChange={changeHandler}
              name="email"
              value={formData.email}
              required
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Age Input */}
            <input
              type="number"
              placeholder="Enter your age"
              onChange={changeHandler}
              name="age"
              value={formData.age}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
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

export default Create;

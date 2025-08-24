"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Comments({blogId}) {
   
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
   });
   const handleChange = (e) => {
    const {name, value}=e.target
    setFormData((prevData)=>({...prevData, [name]:value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    try {
      let response = await axios.post("/api/catalog/comment", {...formData, blogId});
      if (response.status === 201 || response.status === 200) {
         toast.success("Comment Submitted Successfully! ")
        console.log("comment added: ", response.data.result);
        setFormData({
          name:"",
          email:"",
          message:"",

        })
      }
    } catch (error) {
      console.log("API error: ", error);
    }
  };

  return (
    <div className="bg-white min-h-screen p-3 rounded-lg shadow-lg   ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Leave a Comment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your comment..."
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}

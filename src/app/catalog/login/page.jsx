"use client";
 import axios from "axios";
 import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../lib/context/AuthContext";
const page = () => {
  const {fetchUser, user}=useContext(AuthContext)
  const [state, setState] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const route=useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state == "signup") {
      try {
        let {data} = await axios.post("/api/catalog/auth/signup", formData);
        if (data.success) {
          console.log("user register successfully");
          fetchUser()
          route.refresh()
          route.push("/")
          toast.success(data.message);
          setFormData({
            name:"",
            email:"",
            password:""
          })
         }
      } catch (error) {
        console.log("error in signup api", error.message);
      }
    } else {
      try {
        const { email, password } = formData;
        let {data} = await axios.post("/api/catalog/auth/login", { email, password });
        if (data.success) {
          setFormData({ email: "", password: "" });
          toast.success(data.message);
          fetchUser()
          route.refresh()
          console.log("login successfully");
          route.push("/")

        }
      } catch (error) {
        console.log("error in login api", error.message);
      }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {state === "signup" ? "Create New Account" : "Welcome Back"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "signup" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            {state === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* Toggle State */}
        <p className="text-center text-sm text-gray-600 mt-6 cursor-pointer">
          {state === "signup"
            ? "Already have an account?"
            : "Don’t have an account?"}{" "}
          <button
            onClick={() => setState(state === "signup" ? "login" : "signup")}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            {state === "signup" ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default page;

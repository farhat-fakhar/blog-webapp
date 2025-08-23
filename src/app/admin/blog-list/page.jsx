"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const route=useRouter()
  useEffect(() => {
    loadApi();
  }, []);
  const loadApi = async () => {
    try {
      let res = await axios.get("/api/catalog");
      if (res.status === 200) {
        let blogData = res.data;

        setBlogs(blogData.result);
      }
    } catch (error) {
      console.log("api not fetched", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete("/api/catalog/" + id, {
        method:"DELETE"
      });
       if (res.status === 200) {
        toast.success("api delete success fully")
        loadApi();
        route.push("/admin/add-blog")
       }
    } catch (error) {
      console.log("api not deleted:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog List</h1>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200">
          <Link href="/admin/add-blog">+ Add New Blog</Link>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
              <th className="p-3 text-left font-semibold">Title</th>
              <th className="p-3 text-left font-semibold">Category</th>
              <th className="p-3 text-left font-semibold">Author</th>
              <th className="p-3 text-left font-semibold">Date</th>
               <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-purple-50 transition duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-1 text-gray-800 text-sm">{blog.title}</td>
                <td className="p-2 text-gray-600 text-sm">{blog.category}</td>
                <td className="p-3 text-gray-600 text-sm">{blog.author}</td>
                <td className="p-3 text-gray-600 text-sm">
                  {" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                 
                <td className="p-1 text-center space-x-2 w-[200px]">
                  <button onClick={()=>route.push("/admin/blog-list/edit/"+blog._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm shadow">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm shadow"
                  >
                    Delete
                  </button>
                  <button onClick={()=>route.push("/admin/blog-list/view/"+blog._id)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm shadow">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

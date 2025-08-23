"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BlogDetailPage = ({ params }) => {
  const { id } = React.use(params);
  const [blog, setBlog] = useState(null);

  const fetchAPI = async (id) => {
    try {
      let response = await axios.get("/api/catalog/view/" + id);
      if (response.status === 200) {
        setBlog(response.data.result);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAPI(id);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={`${blog.image}`}
            alt={blog.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        )}

        {/* Blog Content */}
        <div className="p-8">
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
              {blog.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(blog.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-end mb-2">
            <span className="px-3 py-1 text-sm   text-blue-600 rounded-full">
              <strong className="px-3">Author Name: </strong>
              {blog.author}
            </span>
          </div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Content */}
          <div className="text-gray-700 text-lg leading-relaxed space-y-4">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

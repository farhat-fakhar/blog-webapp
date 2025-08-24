"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Comments from "../../_components/Comments";
import DisplayComments from "../../_components/DisplayComments";

const BlogDetailPage = ({ params }) => {
  const { id } = React.use(params);  

  const [blog, setBlog] = useState(null);

  const fetchAPI = async (id) => {
    try {
      let response = await axios.get("/api/catalog/detail/" + id);
      if (response.status === 200) {
        setBlog(response.data.result);
      }
    } catch (error) {
      console.log(error);
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
    <div className="min-h-screen bg-gray-50  px-10">
      <div className="m-5">
        <button className="bg-blue-900 rounded hover:bg-blue-600 transition-all duration-300 text-white font-bold px-4 py-2">
          <Link href="/catalog">Back to Home</Link>
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Blog Section */}
        <div className="w-full lg:w-1/2 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Blog Image */}
          {blog.image && (
            <img
              src={`${blog.image}`}
              alt={blog.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          )}

          {/* Blog Content */}
          <div className="p-6 sm:p-8">
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                {blog.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(blog.date).toLocaleDateString()}
              </span>
            </div>

            {/* Author */}
            <div className="flex justify-end mb-2">
              <span className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50">
                <strong className="px-1">Author Name:</strong>
                {blog.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Content */}
            <div className="text-gray-700 text-md leading-relaxed space-y-4">
              {blog.content}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="w-full lg:w-1/2">
          <Comments blogId={blog._id} />
        </div>
        <DisplayComments id={blog._id} />
      </div>
    </div>
  );
};

export default BlogDetailPage;

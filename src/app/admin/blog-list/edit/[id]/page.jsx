"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
export default function EditBlogPage({params}) {
  const {id}=React.use(params)
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
    author: "",
  });
  const route = useRouter();
  const categories = [
    "Technology",
    "Business",
    "Lifestyle",
    "Health & Fitness",
    "Food & Recipes",
    "Education",
    "Entertainment",
  ];
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };
  const loadApi = async (id) => {
    const formData = new FormData();
    formData.append("title", postData.title),
      formData.append("author", postData.author),
      formData.append("content", postData.content),
      formData.append("category", postData.category),
      formData.append("image", postData.image);
    try {
      let res = await axios.get("/api/catalog/edit/" + id);
      if (res.status === 200) {
        let newData = res.data;
        setPostData({
          title: newData.result.title,
          author: newData.result.author,
          content: newData.result.content,
          category: newData.result.category,
          image: newData.result.image,
        });
      }
    } catch (error) {
      console.log("api not fetched: ", error);
    }
  };
  useEffect(() => {
    if (id) {
      loadApi(id);
    }
  }, [id]);

  const handlePublish = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("author", postData.author);
    formData.append("content", postData.content);
    formData.append("category", postData.category);
    if (postData.image instanceof File) {
      formData.append("image", postData.image);
    }

    try {
      let response = await axios.put(
        `/api/catalog/edit/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        route.push("/admin/blog-list");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto ">
        <h1 className="text-2xl font-bold mb-3 text-gray-800">Add New Blog</h1>

        <form className="space-y-5" onSubmit={handlePublish}>
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleOnChange}
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={postData.author}
              onChange={handleOnChange}
              placeholder="Enter author name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Blog Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={postData.category}
              onChange={handleOnChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Image
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setPostData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-gray-900 hover:file:bg-purple-100"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handleOnChange}
              rows="6"
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

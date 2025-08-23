"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const categories = [
  "All",
  "Technology",
  "Business",
  "Lifestyle",
  "Health & Fitness",
  "Food & Recipes",
  "Education",
  "Entertainment",
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [filterBlogs, setFilterBlogs] = useState([]);
  // handle api load
  const apiLoad = async () => {
    try {
      let response = await axios.get("/api/catalog");
      if (response.status === 200) {
        setBlogs(response.data.result || []);
        setFilterBlogs(response.data.result);
        console.log("api data:", response.data.result);
      }
    } catch (error) {
      console.log("fail to fetch api data", error);
    }
  };

  useEffect(() => {
    apiLoad();
  }, []);

  useEffect(() => {
    let result = blogs;
    result =
      selectedCategory === "All"
        ? result
        : result?.filter((blog) => blog.category === selectedCategory);
    if (searchParam.trim()) {
      result = result.filter((blog) => blog.title.toLowerCase().includes(searchParam.toLowerCase()));
     }
     setFilterBlogs(result);
  }, [blogs, selectedCategory, searchParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-center items-center py-4 gap-1">
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaMagnifyingGlass size={16} className="text-gray-500 mr-2" />
          <input
            type="search"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Search the Blog"
            className="outline-none w-64 py-2"
          />
        </div>
        <button className="bg-gray-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800">
          Search
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 cursor-pointer rounded-full font-sm border transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-gray-600 text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {filterBlogs?.length > 0 ? (
        <div className="grid gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-10">
          {filterBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-5">
                <span className="text-sm text-blue-600 font-semibold">
                  {blog.category}
                </span>
                <h2 className="text-medium font-bold mt-2 mb-3">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                 {blog.title.length>100? blog.title.substring(0, 100)+"...":blog.title}
                </p>
                <button className="text-blue-600 font-medium hover:underline">
                   <Link href={blog?._id && `/catalog/${blog._id}`}>Read more</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}
    </div>
  );
}

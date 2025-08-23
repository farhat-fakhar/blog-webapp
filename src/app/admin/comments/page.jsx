"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentListPage() {
  const [comments, setComments] = useState([]);
  // const comments = [
  //   {
  //     id: 1,
  //     author: "Sarah Khan",
  //     email: "sarah@example.com",
  //     content: "Great article! Learned a lot from this post.",
  //     blogTitle: "How AI is Changing the World",
  //     date: "2025-08-09",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2,
  //     author: "Ali Raza",
  //     email: "ali@example.com",
  //     content: "I think you missed some key points about blockchain.",
  //     blogTitle: "The Future of Blockchain",
  //     date: "2025-08-08",
  //     status: "Pending",
  //   },
  // ];
  const tableHeader = [
    "User",
    "Comment",
    "Blog Title",
    "Date",
    "Status",
    "Actions",
  ];
  const loadAPI = async () => {
    try {
      let response = await axios.get("/api/catalog/comment");
      if (response.status === 200) {
        setComments(response.data.result);
        console.log("comments loaded: ", response.data.result);
      }
    } catch (error) {
      console.log("somthing wrong: ", error);
    }
  };
  useEffect(() => {
    loadAPI();
  }, []);

  // handle delete functionality
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete("/api/catalog/comment/" + id);
      if (res.status === 200) {
        setComments((prev) => prev.filter((comment) => comment._id !== id));
        console.log("comment deleted successfully!");
      }
    } catch (error) {
      console.log("somthing went wrong", error);
    }
  };

  //  handle approved comment button

  const handleApprove = async (id) => {
    try {
      let res = await axios.patch("/api/catalog/comment/" + id);
      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: "Approved" } : c))
        );
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-800 mb-3">Comments</h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border border-zinc-50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                {tableHeader.map((label, index) => (
                  <th key={index} className="p-3 text-left">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr
                  key={index}
                  className={`border-b border-zinc-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-50 transition duration-200`}
                >
                  <td className="p-3">
                    <div className="text-sm font-semibold text-gray-800">
                      {comment.name}
                    </div>
                    <div className="text-xs text-gray-500">{comment.email}</div>
                  </td>
                  <td className="p-2 text-gray-600  text-xs   truncate">
                    {comment.message}
                  </td>
                  <td className="p-2 text-gray-600 text-xs">
                    {comment.blogId.title}
                  </td>
                  <td className="p-2 text-gray-600 text-xs">{comment.date}</td>
                  <td className="p-1">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        comment.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {comment.status}
                    </span>
                  </td>
                  <td className="p-2 text-center space-y-2 flex flex-col">
                    {comment.status !== "Approved" && (
                      <button
                        onClick={() => handleApprove(comment._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

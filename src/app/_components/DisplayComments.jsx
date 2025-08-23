"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ApprovedComments({ id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApprovedComments = async () => {
    try {
      const res = await axios.get(`/api/catalog/comment/${id}`);
      if (res.status === 200) {
        const approved = res.data.result.filter(
          (comment) => comment.status === "Approved"
        );
        setComments(approved);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedComments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <span className="text-gray-400 text-sm italic">Loading comments...</span>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex justify-center py-6">
        <span className="text-gray-500 font-medium text-sm">
          No comments yet. Be the first to share your thoughts!
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-5">
        💬 Comments ({comments.length})
      </h2>
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                {comment.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-gray-800 font-semibold">
                  {comment.name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">{comment.email}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

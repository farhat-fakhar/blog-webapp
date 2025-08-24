 import { NextResponse } from "next/server";
import { comment } from "../../../../lib/Models/comments";
import connectDB from "../../../../lib/db";
 
export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    let result = await comment.findByIdAndDelete(id);
    return NextResponse.json({
      result,
      success: true,
      message: "comment deleted successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "comment deleted fail!",
      error: error.message,
    });
  }
};
export const PATCH = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    let result = await comment.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    return NextResponse.json({
      result,
      success: true,
      message: "comment approved successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Failed to approve comment",
    });
  }
};

export const GET = async (req, context) => {
  const { id } = await context.params;  
  try {
    await connectDB();
    let result = await comment.find( {blogId:id, status:"Approved"});
    return NextResponse.json({
      result,
      success: true,
      message: "comment of specific blog",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "fail to get comments",
    });
  }
};

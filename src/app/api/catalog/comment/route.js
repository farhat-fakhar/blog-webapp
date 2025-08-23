import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { comment } from "../../../lib/Models/comments";
const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.connectionStr);
  }
};
export const POST = async (req) => {
  let body = await req.json();
  try {
    await connectDB();
    const { name, email, message, blogId } = body;
    let result = await comment.create({ name, email, message, blogId });
    return NextResponse.json(
      { result, success: true, message: "comment save successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message, message: "fail to submit" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDB();
    let result = await comment.find().populate("blogId", "title");
    return NextResponse.json({
      result,
      success: true,
      message: "all comments are fetched! ",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.messaage,
      message: "fail to fetch api data",
    });
  }
};


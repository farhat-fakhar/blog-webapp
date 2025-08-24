import mongoose from "mongoose";
import { postSchema } from "../../../../lib/Models/post";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";

export async function GET(req, context) {
  let id=context.params.id
  let success = false;

  try {
    await connectDB()
    let result = await postSchema.findById(id);
     if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({ success, error: error.message });
  }
}
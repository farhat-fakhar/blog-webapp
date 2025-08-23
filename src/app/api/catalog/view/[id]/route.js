import mongoose from "mongoose";
import { postSchema } from "../../../../lib/Models/post";
import { NextResponse } from "next/server";
export async function GET(req, context) {
  let success = false;
  const id = context.params.id;
  try {
    await mongoose.connect(process.env.connectionStr);
    let result = await postSchema.findById(id);
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({ success, error: error.message });
  }
}

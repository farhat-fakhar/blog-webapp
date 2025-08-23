import mongoose from "mongoose";
 
import { postSchema } from "../../../lib/Models/post";
import { NextResponse } from "next/server";
 
export async function DELETE(req, context) {
  const id = context.params.id;
  let success = false;
  try {
    await mongoose.connect(process.env.connectionStr);
    let result = await postSchema.findByIdAndDelete(id);
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({ error: error.message, success });
  }
}



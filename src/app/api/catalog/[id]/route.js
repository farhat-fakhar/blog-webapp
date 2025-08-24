  
import { postSchema } from "../../../lib/Models/post";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
 
export async function DELETE(req, context) {
  const id = context.params.id;
  let success = false;
  try {
    await connectDB()
    let result = await postSchema.findByIdAndDelete(id);
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({ error: error.message, success });
  }
}



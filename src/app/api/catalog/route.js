import fs from "fs/promises";
import path from "path";
 import { NextResponse } from "next/server";
import { postSchema } from "../../lib/Models/post";
import connectDB from "../../lib/db";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const author = formData.get("author");
    const content = formData.get("content");
    const category = formData.get("category");
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      throw new Error("No file uploaded");
    }

    const uploadDir = path.join(process.cwd(), "public", "upload");
    await fs.mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + path.extname(file.name);
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const image = `/upload/${filename}`;

    await connectDB()
    const result = new postSchema({ title, content, category, image, author });
    await result.save();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  let success = false;

  try {
    await connectDB()
    let result = await postSchema.find();
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({ success, error: error.message });
  }
}

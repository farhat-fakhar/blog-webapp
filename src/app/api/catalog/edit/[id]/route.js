import mongoose from "mongoose";
import fs from "fs/promises";
import { postSchema } from "../../../../lib/Models/post";
import { NextResponse } from "next/server";
import path from "path";



export async function GET(req, context) {
  const { id } = context.params;

  let success = false;
  try {
    await mongoose.connect(process.env.connectionStr);
    let result = await postSchema.findOne({ _id: id });
     if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    console.log("api data is not fetched: ", error);

    return NextResponse.json({ error: error.message, success });
  }
}

export async function PUT(req, context) {
  const id = context.params.id;
  const formData = await req.formData();

  const title = formData.get("title");
  const category = formData.get("category");
  const content = formData.get("content");
  const author = formData.get("author");
  const file = formData.get("image");

  let imagePath = null;

  if (file && file.name) {
    const uploadDir = path.join(process.cwd(), "public", "upload");
    await fs.mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);
    imagePath = `/upload/${filename}`;
  }

  let success = false;
  try {
    await mongoose.connect(process.env.connectionStr);

    const updateData = { title, category, content, author };
    if (imagePath) updateData.image = imagePath;

    const result = await postSchema.findByIdAndUpdate(id, updateData, { new: true });

    if (result) success = true;

    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({ error: error.message, success });
  }
}



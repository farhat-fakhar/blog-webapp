import { NextResponse } from "next/server";
import connectDB from "../.././../../lib/db";
import jwt from "jsonwebtoken";
import { User } from "../../../../lib/Models/users";
export const GET = async (req) => {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "token not found" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ success: false, message: "user not found" });
    }
    return NextResponse.json({ success: true, user, message: "user authenticated" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

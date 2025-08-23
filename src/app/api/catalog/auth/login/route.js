import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import { User } from "../../../../lib/Models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "input fields are missing",
      });
    }
    await connectDB();

    let user = await User.findOne({ email});
    if (!user) {
      return NextResponse.json({ success: false, message: "user not found!" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Password incorrect!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      success: true,
      message: "login successfully!",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Internal Server Error!",
    });
  }
};

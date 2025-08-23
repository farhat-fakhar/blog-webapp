import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import { User } from "../../../../lib/Models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        mesage: "All fields are required: name, email, password",
      });
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already register on this email",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({
      success: true,
      result: user,
      message: "User Sign Up Successfully!",
      
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
    });
    
    return res

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Internal Server Error",
    });
  }
};

import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";

export const GET = async () => {
  try {
    await connectDB();

    const res = NextResponse.json({
      success: true,
      message: "logout successfully",
    });
    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    return res;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

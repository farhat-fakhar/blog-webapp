import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const verfiyToken = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { success: false, message: "token not found" };
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return { success: true, user: decoded };
  } catch (error) {
    return {
      success: false,
      message: "internal server error",
    };
  }
};
export default verfiyToken;

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router=useRouter()
  const fetchUser = async () => {
    try {
      let { data } = await axios.get("/api/catalog/auth/profile");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.log("fail to fetch auth", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const logout = async () => {
    try {
      let { data } = await axios.get("/api/catalog/auth/logout");
      if (data.success) {
        setUser(null);
         console.log("logout successfully");
      }
    } catch (error) {
      console.log("logout fail",error.message);
    }
  };
  const value = {
    user,
    setUser,
    logout,
    fetchUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

"use client";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { AuthContext } from "../lib/context/AuthContext";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/catalog" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Text size="5" className="font-bold text-gray-700">
              Blog WebApp
            </Text>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700 hover:text-black-500"
                }`}
              >
                <Text size="4">{link.name}</Text>
              </Link>
            ))}
          </div>

          {/* Right Corner Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/admin"
                  className={`transition-colors duration-200 ${
                    pathname === "/admin"
                      ? "text-green-900  font-bold text-lg"
                      : "text-green-700 hover:text-black"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                 onClick={logout}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/catalog/login"
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/catalog/login"
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

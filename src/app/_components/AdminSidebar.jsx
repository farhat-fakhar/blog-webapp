"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaPlus, FaList, FaComments } from "react-icons/fa";

const links = [
  { href: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/admin/add-blog", label: "Add blogs", icon: <FaPlus /> },
  { href: "/admin/blog-list", label: "Blog lists", icon: <FaList /> },
  { href: "/admin/comments", label: "Comments", icon: <FaComments /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="  border-r border-zinc-200 w-50 h-screen p-4 ">
      <h1 className="text-xl font-bold mb-6">QuickBlog</h1>
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 p-2 rounded-md mb-2 ${
              pathname === link.href ? "  text-black font-bold  bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

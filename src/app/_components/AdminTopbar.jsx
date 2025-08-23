"use client";

export default function AdminTopbar() {
  const handleLogout = () => {
 
  };

  return (
    <header className="flex justify-end items-center p-4 border-b border-zinc-200">
      <button
        onClick={handleLogout}
        className="  text-black px-4   rounded-full"
      >
        ...
      </button>
    </header>
  );
}

// components/AdminNavbar.js
import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminNavbar = ({ toggleSidebar }) => {
  const { logoutAdmin, adminDetails } = useAuth();
  return (
    <div className="lg:hidden bg-light text-dark border-b border-gray p-3 flex justify-start items-center">
      <button
        type="button"
        className="lg:hidden bg-light text-dark p-2 rounded-full"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <div className="text-xl font-semibold">
        {" "}
        Welcome, {adminDetails?.name || "Admin"}
      </div>
    </div>
  );
};

export default AdminNavbar;

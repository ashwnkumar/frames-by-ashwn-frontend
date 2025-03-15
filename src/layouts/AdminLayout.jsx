import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";


import toast from "react-hot-toast";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     if (decoded.exp < currentTime) {
  //       localStorage.removeItem("adminToken");
  //       toast.error("Session Expired. Please Log In Again");
  //       navigate("/admin/login");
  //     }
  //   } else {
  //     navigate("/admin/login");
  //   }
  // }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-row">
      <div className="sticky top-0 left-0 h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

import React from "react";

import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="h-screen w-full flex flex-row bg-light">
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

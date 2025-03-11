import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-light text-dark">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <Outlet />
    </div>
  );
};

export default AdminLayout;

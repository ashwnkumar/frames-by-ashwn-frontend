import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-light text-dark min-h-screen">
      <Outlet />
    </div>
  );
};

export default AdminLayout;

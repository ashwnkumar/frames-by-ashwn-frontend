import { Disc3, LayoutDashboard, LogOut, ShoppingBasket } from "lucide-react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/form/Button";

const links = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Manage Records",
    icon: Disc3,
    path: "/admin/vinyls",
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="h-screen w-64 flex flex-col justify-between p-5 border-r border-gray ">
      <div className="flex flex-col gap-2">
        <Link
          to="/admin"
          className="flex items-center justify-center gap-2 whitespace-nowrap text-xl font-semibold"
        >
          <Disc3 />
          SpinCity Admin
        </Link>

        {links.map((link, index) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={index}
              to={link.path}
              className={`p-2 rounded-lg w-full flex flex-row items-center justify-start gap-2 transition-all duration-300 ${
                isActive ? "bg-primary-faded text-primary " : "hover:bg-hover "
              }`}
            >
              <link.icon />
              <p>{link.title}</p>
            </Link>
          );
        })}
      </div>

      <Button
    
        onClick={handleLogout}
        className="w-full flex items-center justify-start gap-2"
      >
        <LogOut />
        <p className="font-normal">Logout</p>
      </Button>
    </div>
  );
};

export default AdminSidebar;

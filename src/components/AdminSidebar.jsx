import {
  Disc3,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  ShoppingBasket,
  SquareLibrary,
} from "lucide-react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./form/Button";
import toast from "react-hot-toast";
import envConfig from "../utils/envConfig";

const links = [
  {
    title: "Home",
    icon: Home,
    path: "/admin",
  },
  {
    title: "Manage Photos",
    icon: Image,
    path: "/admin/photos",
  },
  {
    title: "Manage Albums",
    icon: SquareLibrary,
    path: "/admin/albums",
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast.success("Logout successful.");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="h-screen w-64 flex flex-col justify-between p-5 border-r border-gray ">
      <div className="flex flex-col items-start justify-center gap-2">
        <Link
          to="/admin"
          className="flex items-center justify-center gap-2 whitespace-nowrap text-xl font-semibold"
        >
          Welcome, {envConfig.adminName}
        </Link>

        {links.map((link, index) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={index}
              to={link.path}
              className={`p-2 rounded-lg w-full flex flex-row items-center justify-start gap-2 transition-all duration-300 ${
                isActive ? "bg-dark text-light " : "hover:bg-hover "
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
        variant="danger"
        className="w-full flex items-center justify-start gap-2"
      >
        <LogOut />
        <p className="font-normal">Logout</p>
      </Button>
    </div>
  );
};

export default AdminSidebar;

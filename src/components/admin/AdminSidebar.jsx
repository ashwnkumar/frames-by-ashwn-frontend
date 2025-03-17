import { Home, Image, SquareLibrary, LogOut, X } from "lucide-react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../form/Button";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

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

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutAdmin, adminDetails } = useAuth();

  const handleLogout = () => {
    toast.success("Logout successful.");
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div
      className={`fixed inset-0 z-10 bg-light text-dark transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative lg:w-64 lg:flex lg:flex-col h-full`}
    >
      <div className="flex flex-col justify-between h-full p-4 border-r border-gray">
        <div className="flex flex-col items-start justify-center gap-2 ">
          <Link
            to="/admin"
            className="flex items-center justify-center gap-2 whitespace-nowrap text-xl font-semibold"
          >
            Welcome, {adminDetails?.name || "Admin"}
          </Link>

          {links.map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={index}
                to={link.path}
                className={`p-3 rounded-lg w-full flex flex-row items-center justify-start gap-2 transition-all duration-300 ${
                  isActive ? "bg-dark text-light" : "hover:bg-hover"
                }`}
              >
                <link.icon />
                <p>{link.title}</p>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col justify-end flex-1">
          <Button
            onClick={handleLogout}
            variant="danger"
            className="w-full flex items-center justify-start gap-2 mt-auto"
          >
            <LogOut />
            <p className="font-normal">Logout</p>
          </Button>
        </div>
      </div>

      {/* Close button for mobile view */}
      <div className="lg:hidden absolute top-4 right-4">
        <button className="text-dark" onClick={toggleSidebar}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

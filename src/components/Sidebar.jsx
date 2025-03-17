import { X } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className={` fixed inset-0 z-50 bg-dark text-light transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative lg:w-64 lg:flex lg:flex-col h-full`}
    >
      <div className="flex flex-col justify-start items-start h-full p-4 ">
        <div className="flex flex-row items-center justify-between w-full px-4 py-2">
          <h3
            className="text-4xl font-medium "
            style={{ fontFamily: "Smooch" }}
          >
            frames by ashwn
          </h3>
        </div>
        <div className="flex flex-col gap-5 text-3xl w-full items-start p-10 justify-center h-full">
          {routes.navbar.map((route, index) => (
            <Link
              key={index}
              to={route.path}
              onClick={() => toggleSidebar()}
              className={`relative group ${
                pathname === route.path ? "underline underline-offset-4" : ""
              }`}
            >
              {route.title}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="bg-light text-dark p-2 rounded-full self-center mb-10"
          onClick={toggleSidebar}
        >
          <X size={30} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

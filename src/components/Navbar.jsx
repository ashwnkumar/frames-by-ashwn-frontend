import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="p-4 w-full flex flex-row items-center justify-around fixed top-0 z-50  text-dark backdrop-blur-md">
      <Link to="/" className="text-4xl font-medium" style={{ fontFamily:"Smooch" }}>
        frames by ashwn
      </Link>
      <div className="flex flex-row items-center justify-center gap-10">
        {routes.navbar.map((route, index) => (
          <Link to={route.path} className="relative group">
            {route.title}
            <span
              className={`absolute left-0 -bottom-0.5 h-[2px] w-full bg-dark transform transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${
                pathname === route.path ? "scale-x-100" : ""
              }`}
            ></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

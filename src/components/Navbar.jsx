import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div
      className={`transition-all duration-200 p-4 w-full flex flex-row items-center justify-start md:justify-around gap-4 fixed top-0 z-40 text-dark ${
        scrolled ? "bg-light" : "bg-transparent"
      }`}
    >
      <button
        type="button"
        onClick={toggleSidebar}
        className="bg-dark text-light rounded-full p-1.5 block md:hidden "
      >
        <Menu />
      </button>
      <Link
        to="/"
        className="text-4xl font-medium"
        style={{ fontFamily: "Smooch" }}
      >
        frames by ashwn
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row items-center justify-center gap-10">
        {routes.navbar.map((route, index) => (
          <Link key={index} to={route.path} className="relative group text-lg">
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

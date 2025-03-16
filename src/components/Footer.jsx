import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-6 px-4 md:px-10 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo / Name */}
        <h2
          className="text-5xl tracking-wide mb-4 md:mb-0"
          style={{ fontFamily: "Smooch" }}
        >
          frames by ashwn
        </h2>
        <a
          href="https://www.instagram.com/frames.by.ashwn/"
          target="_blank"
          className="hover:bg-light/20 rounded-full p-2.5 flex items-center justify-center cursor-pointer"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-4xl" />
        </a>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Copyright */}
      <p className="text-center text-gray-400 text-sm">
        © 2025 Designed and Developed by Ashwin Kumar. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;

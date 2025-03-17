import {
  faArtstation,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import SocialIcon from "./SocialIcon";

const socialLinks = [
  {
    href: "https://www.instagram.com/frames.by.ashwn/",
    icon: faInstagram,
  },
  {
    href: "https://in.pinterest.com/ashwnkumar07/",
    icon: faPinterest,
  },
  {
    href: "https://www.artstation.com/ashwnkumar",
    icon: faArtstation,
  },
];

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
        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
          {socialLinks.map(({ href, icon }) => (
            <SocialIcon
              key={href}
              href={href}
              icon={icon}
              className="text-3xl"
            />
          ))}
        </div>
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

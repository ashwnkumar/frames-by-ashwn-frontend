import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialIcon = ({
  href,
  icon,
  label,
  className = "text-4xl text-dark",
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-105 rounded-full p-2.5 flex flex-col items-center justify-center cursor-pointer active:translate-y-0.5 transition-all duration-200"
    >
      <FontAwesomeIcon icon={icon} className={className} />
      {label && <span>{label}</span>}
    </a>
  );
};

export default SocialIcon;

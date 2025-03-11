import { Eye } from "lucide-react";
import React from "react";

const ImageComponent = ({ src, index, openModal }) => {
  return (
    <div
      className="rounded-lg group overflow-hidden cursor-pointer relative"
      onClick={() => openModal(index)}
    >
      <img
        src={src}
        alt={`image-${index}`}
        loading="lazy"
        className="w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-60"
      />
      <div className="text-light absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <Eye size={30} />
      </div>
    </div>
  );
};

export default ImageComponent;

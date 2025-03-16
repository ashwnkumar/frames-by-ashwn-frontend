import { Eye, Pencil } from "lucide-react";
import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const ImageComponent = ({ src, index, openModal }) => {
  const { isAdmin } = useGlobalContext();
  const navigate = useNavigate();

  const handleEdit = (e, index) => {
    e.stopPropagation();
    navigate(`/admin/photos/edit/${index}`);
  };
  return (
    <div
      className="rounded-lg group overflow-hidden cursor-pointer relative h-fit w-full"
      onClick={() => openModal(index)}
    >
      <img
        src={src}
        alt={`image-${index}`}
        loading="lazy"
        className="w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-60"
      />
      <div className="text-light absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <button type="button" className=" cursor-pointer">
            <Eye size={30} />
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={(e) => handleEdit(e, index)}
              className=" cursor-pointer"
            >
              <Pencil size={25} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;

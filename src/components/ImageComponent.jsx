import {
  Eye,
  Pencil,
  X,
  ChevronRight,
  ChevronLeft,
  Trash2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDataContext } from "../contexts/DataContext";

const ImageComponent = ({ images, imageId }) => {
  const mongoId = images[imageId]?._id;
  const { isAdmin } = useGlobalContext();
  const navigate = useNavigate();
  const { deletePhoto } = useDataContext();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  let touchStartX = 0;
  let touchEndX = 0;

  // Open Lightbox
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Close Lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentIndex(null);
  };

  // Navigate Images
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Handle Touch Swipes
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX > 50) prevImage();
  };

  const buttonData = [
    {
      label: "Cancel",
      variant: "outline",
      onClick: () => setOpenDelete(false),
    },
    {
      label: "Delete",
      variant: "danger",
      onClick: () => {
        deletePhoto(mongoId);
        setOpenDelete(false);
      },
    },
  ];

  return (
    <>
      {/* Image Card */}
      <div
        className="rounded-lg group overflow-hidden cursor-pointer relative h-fit w-full"
        onClick={() => openLightbox(imageId)}
      >
        <img
          src={images[imageId]?.previewUrl}
          alt={images[imageId]?.title || "Image"}
          loading="lazy"
          decoding="async"
          className="w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-60"
        />
        <div className="text-light absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex flex-row items-center justify-center gap-4">
            <button type="button" aria-label="View Image">
              <Eye size={30} />
            </button>
            {isAdmin && (
              <>
                <button
                  type="button"
                  aria-label="Edit Image"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/photos/edit/${mongoId}`);
                  }}
                >
                  <Pencil size={25} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              <X size={30} />
            </button>

            {/* Image Wrapper (Prevents accidental lightbox closing) */}
            <div
              className="flex flex-col items-center max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={images[currentIndex]?.imageUrl}
                alt={images[currentIndex]?.title || "Image"}
                className="w-auto max-h-[80vh] object-contain mx-auto"
              />

              {/* Title & Description */}
              <div className="text-center mt-4 px-6 text-white">
                <h2 className="text-lg font-semibold">
                  {images[currentIndex]?.title}
                </h2>
                <p className="text-sm opacity-80">
                  {images[currentIndex]?.description}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous Image"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next Image"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageComponent;

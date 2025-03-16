import React, { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const Lightbox = ({
  images,
  currentIndex,
  closeModal,
  nextImage,
  prevImage,
}) => {
  if (currentIndex === null || images.length === 0) return null;

  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, nextImage, prevImage]);

  const renderDescription = (text) => {
    if (!text) return "No description available.";

    const words = text.split(" ");
    if (words.length <= 10) return text;

    return (
      <span>
        {showFullDescription ? text : words.slice(0, 10).join(" ") + "... "}
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-blue-400 underline cursor-pointer"
        >
          {showFullDescription ? "Show less" : "Show more"}
        </button>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-6">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
      >
        <X size={30} />
      </button>

      {/* Left Navigation */}
      <button
        onClick={prevImage}
        className="absolute left-4 text-white hover:text-gray-300 transition"
      >
        <ChevronLeft size={40} />
      </button>

      <div className="flex flex-col items-center justify-center h-full  gap-4 text-light w-full">
        <div className="flex items-center justify-center gap-8 max-w-6xl w-full h-full">
          {/* Image Display */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={images[currentIndex]?.imageUrl}
              alt={images[currentIndex]?.title || "Image"}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Side Info Panel */}
          <div className="bg-black bg-opacity-70 p-6 rounded-lg max-w-sm w-72 text-white shadow-lg">
            <h2 className="text-2xl font-semibold">
              {images[currentIndex]?.title || "Untitled"}
            </h2>
            <p className="text-sm opacity-80 mt-1">
              {renderDescription(images[currentIndex]?.description)}
            </p>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="mt-4 text-sm text-gray-300 bg-black bg-opacity-50 px-4 py-2 rounded-lg flex items-center justify-center">
          <p className="flex flex-row items-center justify-center">
            Use{" "}
            <span className="border border-gray p-0.5 rounded mx-1">
              <ArrowLeft size={20} />
            </span>{" "}
            <span className="border border-gray p-0.5 rounded mx-1">
              <ArrowRight size={20} />
            </span>{" "}
            to Navigate.{" "}
          </p>{" "}
          <p>
            Press <span className="border border-gray p-0.5 rounded">Esc</span>{" "}
            to Close
          </p>
        </div>
      </div>

      {/* Right Navigation */}
      <button
        onClick={nextImage}
        className="absolute right-4 text-white hover:text-gray-300 transition"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

export default Lightbox;

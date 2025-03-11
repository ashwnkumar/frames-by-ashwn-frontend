import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
      onClick={onClose}
    >
      <div
        className="relative p-4 max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Left Navigation */}
        {currentIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2"
            onClick={onPrev}
          >
            <ChevronLeft size={30} />
          </button>
        )}

        {/* Image Display */}
        <img
          src={images[currentIndex]}
          alt="Full-size"
          className="w-full h-auto rounded-lg"
        />

        {/* Right Navigation */}
        {currentIndex < images.length - 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2"
            onClick={onNext}
          >
            <ChevronRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Lightbox;

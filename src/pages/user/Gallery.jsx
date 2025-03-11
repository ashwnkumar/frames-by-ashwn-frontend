import React, { useState } from "react";

import Lightbox from "../../components/Lightbox";
import ImageComponent from "../../components/ImageComponent";

const images = [];

// CURRENT IMAGES FORMAT IS AN ARRAY OF STRINGS
// REFACTOR TO ACCEPT AN ARRAY OF OBJECTS
// MAKE CHANGES ACCORDINGLY TO IMAGECOMPONENT.JSX AND LIGHTBOX.JSX

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <ImageComponent
            key={index}
            src={src}
            index={index}
            openModal={openModal}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
};

export default Gallery;

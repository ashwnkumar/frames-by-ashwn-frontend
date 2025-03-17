import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ImageStack = ({ images, totalCount }) => {
  // Number of images to show in the stack
  const stackImages = images.slice(0, 4);
  // Count of remaining images
  const remainingCount = images.length - stackImages.length;

  return (
    <div className="flex items-center justify-start gap-3 md:gap-5 flex-wrap lg:flex-nowrap">
      {/* Stacked images horizontally */}
      {stackImages.map((image, index) => (
        <div
          key={index}
          className="w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 object-cover overflow-hidden rounded-lg"
        >
          <img
            src={image?.previewUrl} // Assuming each image object has a 'url' property
            alt={`Image ${index + 1}`}
            className="hover:scale-110 transition-all duration-200 w-full h-full"
            style={{ objectFit: "cover" }} // Ensure the images cover the square area
          />
        </div>
      ))}

      <Link
        to="/admin/photos"
        className="w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 object-cover rounded-lg flex items-center justify-center border-2 border-dashed text-lg border-gray hover:border-dark/50 cursor-pointer"
      >
        <span className="text-placeholder font-medium flex items-center justify-center">
          View All Photos
        </span>
      </Link>
    </div>
  );
};

export default ImageStack;

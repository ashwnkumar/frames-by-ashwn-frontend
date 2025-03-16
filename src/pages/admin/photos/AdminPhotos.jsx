import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Header from "../../../components/Header";
import { useDataContext } from "../../../contexts/DataContext";
import ImageComponent from "../../../components/ImageComponent";

const AdminPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewingLightbox, setViewingLightbox] = useState(false);

  const { fetchedPhotos } = useDataContext();

  useEffect(() => {
    setPhotos(fetchedPhotos); // Always update photos when fetchedPhotos changes
  }, [fetchedPhotos]);

  const openModal = (index) => {
    setLightboxIndex(index);
    setViewingLightbox(true);
  };

  const buttons = [
    {
      label: "Add Photo",
      navTo: "/admin/photos/add",
      icon: <Plus />,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header title="Manage Photos" buttonData={buttons} />

      {/* Simple Grid Layout */}
      <div className="grid gap-4 p-4 w-full max-w-7xl grid-cols-4">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div
              key={photo._id}
              className="relative overflow-hidden rounded-xl"
            >
              <ImageComponent
                images={photos.map((p) => p)} // Pass all images for navigation
                imageId={index} // Image index in the array
                // openModal={openModal} // Function to open lightbox
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No photos available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPhotos;

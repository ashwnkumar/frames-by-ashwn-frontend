import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Header from "../../../components/Header";
import { useDataContext } from "../../../contexts/DataContext";
import ImageComponent from "../../../components/ImageComponent";
import Lightbox from "../../../components/Lightbox";

const AdminPhotos = () => {
  const [photos, setPhotos] = useState([]);

  const { fetchedPhotos } = useDataContext();

  useEffect(() => {
    if (fetchedPhotos.length !== photos.length) {
      setPhotos(fetchedPhotos);
    }
  }, [fetchedPhotos, photos.length]);

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

  console.log("fetchedPhotos", fetchedPhotos);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Lightbox */}

      <Header title="Manage Photos" buttonData={buttons} />

      {/* Simple Grid Layout */}
      <div className="grid gap-4 p-4 w-full max-w-7xl grid-cols-4">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div
              key={photo._id}
              className="relative overflow-hidden rounded-xl"
            >
              <ImageComponent src={photo.previewUrl} index={photo._id} />
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

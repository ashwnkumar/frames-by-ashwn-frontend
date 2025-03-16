import React from "react";
import { useDataContext } from "../../contexts/DataContext";
import ImageComponent from "../../components/ImageComponent";

const GalleryPage = () => {
  const { fetchedPhotos, loading, error } = useDataContext();

  if (loading) {
    return <p className="text-center text-gray-500">Loading photos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load photos.</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center ">
      <h1 className="text-3xl font-bold mt-6 mb-4">Gallery</h1>

      {fetchedPhotos.length === 0 ? (
        <p className="text-gray-500">No photos available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 w-full max-w-7xl">
          {fetchedPhotos.map((photo, index) => (
            <div key={photo.id} className="relative overflow-hidden rounded-lg">
              <ImageComponent
                images={fetchedPhotos.map((p) => p)}
                imageId={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;

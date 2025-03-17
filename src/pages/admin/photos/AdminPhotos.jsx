import React, { useEffect, useState, useRef } from "react";
import { Plus } from "lucide-react";
import Header from "../../../components/Header";
import { useDataContext } from "../../../contexts/DataContext";
import ImageComponent from "../../../components/ImageComponent";

const AdminPhotos = () => {
  const { fetchedPhotos, fetchPhotos, loading, hasMore } = useDataContext();
  const [photos, setPhotos] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    setPhotos(fetchedPhotos);
  }, [fetchedPhotos]);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos(); // Fetch next batch
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore, fetchPhotos]);

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

      {/* Masonry Layout */}
      <div className="columns-2 md:columns-3 gap-4 p-4 w-full max-w-7xl">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div key={photo._id} className="mb-4 break-inside-avoid">
              <ImageComponent images={photos} imageId={index} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No photos available.
          </p>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={observerRef} className="w-full h-10 flex justify-center mt-4">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default AdminPhotos;

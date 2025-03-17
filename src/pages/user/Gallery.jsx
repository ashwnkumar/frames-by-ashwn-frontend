import React, { useEffect, useRef } from "react";
import { useDataContext } from "../../contexts/DataContext";
import ImageComponent from "../../components/ImageComponent";

const GalleryPage = () => {
  const { fetchedPhotos, loading, error, fetchPhotos, hasMore } =
    useDataContext();
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchPhotos, loading, hasMore]);

  if (error) {
    return <p className="text-center text-red-500">Failed to load photos.</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6 mb-4">Gallery</h1>

      {fetchedPhotos.length === 0 && !loading ? (
        <p className="text-gray-500">No photos available.</p>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4 w-full max-w-7xl">
          {fetchedPhotos.map((photo, index) => (
            <div key={photo._id} className="mb-4 break-inside-avoid">
              <ImageComponent images={fetchedPhotos} imageId={index} />
            </div>
          ))}
        </div>
      )}

      {/* Attach observer to this div instead of last item */}
      <div ref={observerRef} className="h-10 w-full"></div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="ml-2 text-gray-500 text-sm">Loading more photos...</p>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;

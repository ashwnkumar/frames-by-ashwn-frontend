import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import axiosInstance from "../utils/axiosInstance";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [fetchedPhotos, setFetchedPhotos] = useState([]);
  const [fetchedAlbums, setFetchedAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFetched = useRef(false); // Prevent re-fetching

  const getPhotoById = async (id) => {
    try {
      const response = await axiosInstance.get(`/photos/${id}`);
      return response.data.photo;
    } catch (error) {
      console.error("Error Fetching Photo", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (isFetched.current) return; // Prevent duplicate fetching

    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/photos");
        setFetchedPhotos(response.data.photos);
        isFetched.current = true; // Mark as fetched
      } catch (error) {
        console.error("Error Fetching Photos", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [getPhotoById]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      fetchedPhotos,
      setFetchedPhotos,
      fetchedAlbums,
      setFetchedAlbums,
      loading,
      error,
      getPhotoById,
    }),
    [fetchedPhotos, fetchedAlbums, loading, error]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

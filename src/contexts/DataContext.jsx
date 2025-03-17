import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import axiosInstance from "../utils/axiosInstance";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [fetchedPhotos, setFetchedPhotos] = useState([]);
  const [fetchedAlbums, setFetchedAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetched = useRef(false);

  // 🔹 Fix: Memoize fetchPhotos with useCallback
  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/photos?page=${page}`);
      const newPhotos = response.data.photos;
      setFetchedPhotos((prev) => [...prev, ...newPhotos]);

      // 🔹 Update pagination state correctly
      setHasMore(newPhotos.length > 0);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error Fetching Photos", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]); // Dependencies must be stable

  useEffect(() => {
    if (isFetched.current) return;
    fetchPhotos();
    isFetched.current = true;
  }, [fetchPhotos]);

  const contextValue = {
    fetchedPhotos,
    setFetchedPhotos,
    fetchedAlbums,
    setFetchedAlbums,
    loading,
    error,
    fetchPhotos,
    hasMore,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

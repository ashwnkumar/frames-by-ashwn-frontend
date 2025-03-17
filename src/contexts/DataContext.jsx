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
  const [totalPhotos, setTotalPhotos] = useState(0);
  const isFetched = useRef(false);

  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/photos?page=${page}`);
      const newPhotos = response.data.photos;
      setFetchedPhotos((prev) => [...prev, ...newPhotos]);
      setTotalPhotos(response.data.totalPhotos);
      setHasMore(newPhotos.length > 0);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error Fetching Photos", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const getPhotoById = useCallback(async (id) => {
    try {
      const response = await axiosInstance.get(`/photos/${id}`);
      return response.data.photo;
    } catch (err) {
      console.error("Error Fetching Photo", err);
      setError(err);
    }
  }, []);

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
    getPhotoById,
    hasMore,
    totalPhotos,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

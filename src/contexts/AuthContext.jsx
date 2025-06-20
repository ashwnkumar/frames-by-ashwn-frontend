import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

import { createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./GlobalContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { setLoading } = useGlobalContext();
  const [adminDetails, setAdminDetails] = useState({});
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  const fetchAdminDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin");
      setAdminDetails(response?.data?.admin);
    } catch (error) {
      console.log("Error fetching admin details", error);
    } finally {
      setLoading(false);
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const response = await axiosInstance.post(
        "/admin/login",
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setToken(response.data.token);
      localStorage.setItem("adminToken", response.data.token);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log("Error logging in admin", error);
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  const updateAdminDetails = async (formData) => {
    try {
      const response = await axiosInstance.put("/admin", formData);
      fetchAdminDetails();
      console.log("response from update admin call", response);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error updating admin details", error);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginAdmin, adminDetails, logoutAdmin, updateAdminDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

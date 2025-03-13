import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

const AdminRoute = () => {
  const { isAdmin } = useGlobalContext();

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;

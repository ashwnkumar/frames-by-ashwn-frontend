import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserLayout = () => {
  return (
    <div className="bg-light text-dark min-h-screen">
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

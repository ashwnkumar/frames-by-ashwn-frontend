import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="bg-light text-dark min-h-screen">
      <Navbar />
      <div className="mt-12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;

import React from "react";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <div>
      AdminHome
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

export default AdminHome;

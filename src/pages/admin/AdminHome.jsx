import React from "react";
import Header from "../../components/Header";
import { useDataContext } from "../../contexts/DataContext";
import ImageStack from "../../components/ImageStack";

const AdminHome = () => {
  const { fetchedPhotos, totalPhotos } = useDataContext();
  console.log("fetchedPhotos from admin home", fetchedPhotos);
  const buttons = [
    {
      label: "Edit Details",
      navTo: "/admin/edit",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Header title="Admin Home" buttonData={buttons} />
    </div>
  );
};

export default AdminHome;

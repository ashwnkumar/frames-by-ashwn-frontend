import React from "react";
import Header from "../../components/Header";

const AdminHome = () => {
  const buttons = [
    {
      label: "Edit Details",
      navTo: "/admin/edit",
    },
  ];
  return (
    <div className="w-full min-h-screen">
      <Header title="Admin Home " buttonData={buttons} />
    </div>
  );
};

export default AdminHome;

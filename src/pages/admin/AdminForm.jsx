import React, { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/form/DynamicForm";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useGlobalContext } from "../../contexts/GlobalContext";

const AdminForm = () => {
  const { adminDetails, updateAdminDetails } = useAuth();
  const { setLoading } = useGlobalContext();
  const navigate = useNavigate();
  console.log("admindetails from admin form", adminDetails);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aboutText: "",
    profileUrl: null,
    landingPageUrl: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newFormData = new FormData();
      newFormData.append("name", formData.name);
      newFormData.append("email", formData.email);
      newFormData.append("aboutText", formData.aboutText);
      newFormData.append("profileUrl", formData.profileUrl);
      newFormData.append("landingPageUrl", formData.landingPageUrl);

      await updateAdminDetails(newFormData);
      navigate("/admin");
    } catch (error) {
      console.log("Error updating admin details", error);
      toast.error("Error updating admin details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminDetails) {
      setFormData({
        name: adminDetails.name,
        email: adminDetails.email,
        aboutText: adminDetails.aboutText,
        profile: adminDetails.profileUrl,
        landingPageImage: adminDetails.landingPageUrl,
      });
    }
  }, [adminDetails]);

  const formOptions = [
    {
      formType: "input",
      type: "text",
      label: "Admin Name",
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
    },
    {
      formType: "input",
      type: "email",
      label: "Email",
      name: "email",
      value: formData.email,
      onChange: handleInputChange,
    },
    {
      formType: "textarea",
      type: "text",
      label: "About Section Content",
      name: "aboutText",
      value: formData.aboutText,
      onChange: handleInputChange,
    },
    {
      formType: "file",
      label: "Profile",
      value: formData.photo,
      name: "profile",
      onChange: (file) => setFormData({ ...formData, profileUrl: file }),
      existingImage: formData?.profileUrl || null, // Pass existing image
    },
    {
      formType: "file",
      label: "Landing Page Image",
      name: "profile",
      value: formData.photo,
      onChange: (file) => setFormData({ ...formData, landingPageUrl: file }),
      existingImage: formData?.landingPageUrl || null, // Pass existing image
    },
  ];

  console.log("form data from admin form", formData);

  const buttons = [
    {
      label: "Cancel",
      navTo: "/admin",
      variant: "outline",
    },
    {
      label: "Save Changes",
      onClick: handleSubmit,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Header title="Add Photo" buttonData={buttons} />

      <div className="max-w-xl mx-auto p-4">
        <DynamicForm options={formOptions} submitText="Upload" />
      </div>
    </div>
  );
};

export default AdminForm;

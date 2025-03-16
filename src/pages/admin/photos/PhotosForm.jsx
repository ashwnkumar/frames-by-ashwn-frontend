import React, { useEffect, useState } from "react";
import DynamicForm from "../../../components/form/DynamicForm";
import Header from "../../../components/Header";
import { Pencil, Plus } from "lucide-react";
import MultiSelectDropdown from "../../../components/form/MultiSelectDropdown";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axiosInstance";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../../contexts/DataContext";

const PhotosForm = () => {
  const params = useParams();
  const isEditing = !!params.id;

  const { getPhotoById } = useDataContext();
  const { setLoading } = useGlobalContext();
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    album: "",
    photo: null,
  });

  console.log("photoData is", photoData);

  useEffect(() => {
    if (isEditing) {
      const fetchPhoto = async () => {
        try {
          const response = await getPhotoById(params.id);
          console.log("response from form page", response);
          setPhotoData(response);
          setFormData({
            title: response.title,
            description: response.description,
            album: response.album,
            photo: response.previewUrl,
          });
        } catch (error) {
          console.error("Error Fetching Photo", error);
        }
      };

      fetchPhoto();
    }
  }, [isEditing, params.id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("album", formData.album);
      formDataToSend.append("photo", formData.photo);

      if (isEditing) {
        await axiosInstance.put(`/photos/${params.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Photo updated successfully");
      } else {
        const response = await axiosInstance.post(
          "/photos/upload",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Photo uploaded successfully");
      }
      navigate("/admin/photos");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log("Error Adding Photo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  console.log("formData", formData);

  const handleSelectionChange = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      album: option.value,
    }));
  };

  const formOptions = [
    {
      formType: "file",
      required: true,
      label: "Upload Photo",
      value: formData.photo,
      name: "photo",
      onChange: (file) => setFormData({ ...formData, photo: file }),
      existingImage: isEditing ? photoData?.previewUrl : null, // Pass existing image
    },
    {
      formType: "input",
      type: "text",
      required: true,
      label: "Photo Title",
      value: formData.title,
      name: "title",
      onChange: handleInputChange,
    },
    {
      formType: "textarea",
      type: "text",
      label: "Description",
      value: formData.description,
      name: "description",
      onChange: handleInputChange,
    },
    {
      formType: "dropdown",
      required: false,
      label: "Select Album",
      value: formData.album, // Ensure it syncs with formData
      name: "album",
      onChange: handleSelectionChange,
      options: [
        { value: "album1", option: "Album 1" },
        { value: "album2", option: "Album 2" },
      ],
    },
  ];

  const addButtons = [
    {
      label: "Cancel",
      navTo: "/admin/photos",
      variant: "outline",
    },
    {
      label: "Add Photo",
      onClick: handleSubmit,
      icon: <Plus />,
    },
  ];

  const editButtons = [
    {
      label: "Cancel",
      navTo: "/admin/photos",
      variant: "outline",
    },
    {
      label: "Update Photo",
      onClick: handleSubmit,
      icon: <Pencil />,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Header
        title="Add Photo"
        buttonData={isEditing ? editButtons : addButtons}
      />

      <div className="max-w-xl mx-auto p-4">
        <DynamicForm options={formOptions} submitText="Upload" />
      </div>
    </div>
  );
};

export default PhotosForm;

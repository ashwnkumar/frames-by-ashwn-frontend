import React, { useState } from "react";
import DynamicForm from "../components/DynamicForm";

const AddPhotos = () => {
  const [photoTitle, setPhotoTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const handleSubmit = () => {
    // Handle form submission logic (API call to upload photo)
    console.log({
      title: photoTitle,
      album: selectedAlbum,
      file: photoFile,
    });
  };

  const formOptions = [
    {
      formType: "input",
      type: "text",
      required: true,
      label: "Photo Title",
      value: photoTitle,
      onChange: (e) => setPhotoTitle(e.target.value),
    },
    {
      formType: "dropdown",
      required: false,
      label: "Select Album",
      value: selectedAlbum,
      setValue: setSelectedAlbum,
      options: [
        { value: "album1", label: "Album 1" },
        { value: "album2", label: "Album 2" },
      ],
    },
    {
      formType: "file",
      required: true,
      label: "Upload Photo",
      value: photoFile,
      onChange: (file) => setPhotoFile(file),
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <DynamicForm
        title="Upload Photo"
        options={formOptions}
        submitText="Upload"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddPhotos;

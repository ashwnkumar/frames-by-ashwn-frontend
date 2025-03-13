import { useState, useCallback, useMemo } from "react";
import { Upload, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const FileUpload = ({
  onFileSelect,
  label = "Add an Image",
  id,
  name,
  required,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Memoized valid formats
  const validFormats = useMemo(
    () => ["image/svg+xml", "image/png", "image/jpeg", "image/gif"],
    []
  );

  const handleFile = useCallback(
    (file) => {
      if (!file) return;

      if (validFormats.includes(file.type)) {
        setSelectedFile(URL.createObjectURL(file));
        onFileSelect?.(file);
      } else {
        setSelectedFile(null);
        onFileSelect?.(null);
        toast.error(
          "Invalid file format. Please upload an image file (SVG, PNG, JPG, or GIF)."
        );
      }
    },
    [onFileSelect, validFormats]
  );

  const handleFileChange = useCallback(
    (event) => {
      handleFile(event.target.files[0]);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="flex flex-col items-start w-full text-dark">
      {/* Label */}
      {label && (
        <label htmlFor={id} className="text-md font-medium">
          {label}{" "}
          {required && (
            <span className="text-danger text-lg font-medium">*</span>
          )}
        </label>
      )}

      {/* Image Preview */}
      {selectedFile ? (
        <div className="relative w-full h-64 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
          <img
            src={selectedFile}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-hover transition"
            onClick={() => {
              setSelectedFile(null);
              onFileSelect?.(null);
            }}
            aria-label="Remove uploaded image"
          >
            <XCircle className="text-red-500" />
          </button>
        </div>
      ) : (
        // Upload Input with Drag and Drop
        <label
          htmlFor={id}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
            isDragging ? "border-primary bg-gray-100" : "border-gray-300"
          } border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="mb-2" />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
          </div>
          <input
            id={id}
            type="file"
            name={name}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;

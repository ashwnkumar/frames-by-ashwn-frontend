import { useState, useCallback, useEffect, useMemo } from "react";
import { Upload, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const FileUpload = ({
  onFileSelect,
  label = "Add an Image",
  id,
  name,
  required,
  existingImage, // <-- Added prop for existing image preview
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(existingImage || null); // Initialize with existing image
  const [isDragging, setIsDragging] = useState(false);

  // Memoized valid formats
  const validFormats = useMemo(
    () => ["image/svg+xml", "image/png", "image/jpeg", "image/gif"],
    []
  );

  // Update preview if an existing image is provided (useful when editing)
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;

      if (validFormats.includes(file.type)) {
        setPreview(URL.createObjectURL(file)); // Show preview of new upload
        setSelectedFile(file);
        onFileSelect?.(file);
      } else {
        setPreview(existingImage || null); // Reset to existing image if invalid file
        setSelectedFile(null);
        onFileSelect?.(null);
        toast.error(
          "Invalid file format. Please upload an image file (SVG, PNG, JPG, or GIF)."
        );
      }
    },
    [onFileSelect, validFormats, existingImage]
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

  const handleRemoveImage = () => {
    setPreview(null);
    setSelectedFile(null);
    onFileSelect?.(null);
  };

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
      {preview ? (
        <div className="relative w-full h-64 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-hover transition"
            onClick={handleRemoveImage}
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

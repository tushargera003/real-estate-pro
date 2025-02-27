import React, { useState } from "react";

const DocumentUpload = ({ setFormData }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, document: file }));
      setFileName(file.name);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 font-medium mb-2">
        Upload Document:
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        className="w-full border rounded-lg px-3 py-2 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-blue-700"
      />
      {fileName && (
        <p className="text-sm text-gray-600 mt-1">Selected: {fileName}</p>
      )}
    </div>
  );
};

export default DocumentUpload;

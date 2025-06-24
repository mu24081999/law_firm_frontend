import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

const TemplateUploadForm = () => {
  const [files, setFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false); // 👈 Form visibility state

  const handleFileChange = (e) => {
    const selected = [...e.target.files];
    const allowed = ["text/html", "text/css"];
    const newErrors = [];

    const valid = selected.filter((file) => {
      if (allowed.includes(file.type)) return true;
      newErrors.push(`Invalid file type: ${file.name}`);
      return false;
    });

    setFiles(valid);
    setErrors(newErrors);
  };

  const handlePreviewImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => [...prev, `Preview must be an image file.`]);
      setPreviewImage(null);
    } else {
      setPreviewImage(file);
      setErrors((prev) => prev.filter((err) => !err.includes("Preview")));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrors([]);

    if (!files.length) {
      setErrors(["Please select at least one HTML or CSS file."]);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (previewImage) formData.append("files", previewImage);
    formData.append("name", name);
    formData.append("description", description);

    try {
      setStatus("Uploading...");
      await axios.post(
        `${backendURL}/default-templates/upload-template`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStatus("✅ Template uploaded successfully!");
      toast.success("Template uploaded successfully!");
      setFiles([]);
      setPreviewImage(null);
      setName("");
      setDescription("");
      setErrors([]);
      setShowForm(false); // Hide form after successful upload
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed.");
      toast.error("Template upload failed.");
    }
  };

  const groupedFiles = files.reduce((acc, file) => {
    const ext = file.name.split(".").pop();
    acc[ext] = acc[ext] || [];
    acc[ext].push(file.name);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto mt-12">
      {/* Toggle Button */}
      <div className="float-end items-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-3xl font-bold text-white bg-blue-600 hover:bg-blue-700 px-2  rounded-full transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          title={showForm ? "Close Form" : "Open Form"}
        >
          {showForm ? "×" : "+"}
        </button>
      </div>

      {showForm && (
        <div className="p-8 bg-white rounded-2xl shadow-lg border space-y-5 transition-all duration-300 ease-in-out">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Template Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                rows="3"
                className="mt-1 w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Upload HTML/CSS Files
              </label>
              <input
                type="file"
                multiple
                accept=".html,.css"
                onChange={handleFileChange}
                className="mt-2 w-full p-2 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Preview Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePreviewImageChange}
                className="mt-2 w-full p-2 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-100 text-red-700 p-3 rounded">
                {errors.map((err, idx) => (
                  <p key={idx}>⚠ {err}</p>
                ))}
              </div>
            )}

            {(files.length > 0 || previewImage) && (
              <div className="bg-gray-100 border p-4 rounded text-sm text-gray-800">
                <p className="font-semibold mb-2">Selected Files:</p>
                <ul className="list-disc list-inside">
                  {Object.entries(groupedFiles).map(([ext, names]) => (
                    <li key={ext}>
                      <strong>.{ext}</strong>: {names.join(", ")}
                    </li>
                  ))}
                  {previewImage && (
                    <li>
                      <strong>Image</strong>: {previewImage.name}
                    </li>
                  )}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Upload Template
            </button>

            {status && (
              <div
                className={`mt-4 text-sm font-medium ${
                  status.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default TemplateUploadForm;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Download, X } from "lucide-react";

const FilePreviewFromCloudinary = ({ files }) => {
  const [showModal, setShowModal] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({});

  const handleDownload = (file) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.target = "__blank";
    a.download = file.name;
    a.click();
  };

  const renderDownload = (file, index) => {
    const progress = downloadProgress[index];

    return (
      <button
        onClick={() => handleDownload(file, index)}
        className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
      >
        <Download size={14} />
      </button>
    );
  };

  const renderPreview = (file, index) => {
    const { name, type, url } = file;
    const baseStyles =
      "rounded-xl p-2 shadow bg-white w-full flex flex-col items-center gap-2";

    if (type.startsWith("image/")) {
      return (
        <div key={index} className={baseStyles}>
          <img
            src={url}
            alt={name}
            className="rounded-xl w-full h-40 object-cover"
          />
          {renderDownload(file, index)}
        </div>
      );
    }

    if (type.startsWith("video/")) {
      return (
        <div key={index} className={baseStyles}>
          <video controls className="rounded-xl w-full h-40">
            <source src={url} type={type} />
          </video>
          {renderDownload(file, index)}
        </div>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <div key={index} className={baseStyles}>
          <audio controls className="w-full">
            <source src={url} type={type} />
          </audio>
          <p className="text-sm">{name}</p>
          {renderDownload(file, index)}
        </div>
      );
    }

    if (type === "application/pdf") {
      return (
        <div key={index} className={baseStyles}>
          <iframe src={url} title={name} className="w-full h-40 rounded-xl" />
          <p className="text-sm text-center">{name}</p>
          {renderDownload(file, index)}
        </div>
      );
    }

    const docTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    ];

    if (docTypes.includes(type)) {
      return (
        <div key={index} className={baseStyles}>
          <img
            src="/file-icons/doc-file.png" // You can replace with different icons for ppt, xls, etc.
            alt="doc"
            className="w-16 h-16"
          />
          <p className="text-sm text-center">{name}</p>
          {renderDownload(file, index)}
        </div>
      );
    }

    // Default fallback preview for unsupported or unknown types
    return (
      <div key={index} className={baseStyles}>
        <img
          src="/file-icons/unknown-file.png"
          alt="file"
          className="w-16 h-16"
        />
        <p className="text-sm text-center">{name}</p>
        {renderDownload(file, index)}
      </div>
    );
  };

  const previewLimit = 1;
  const showPreview = files.slice(0, previewLimit);
  const remainingCount = files.length - previewLimit;

  return (
    <>
      <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-4 bg-[#e5ddd546] p-4 rounded-xl">
        {showPreview.map((file, index) => {
          if (index === previewLimit - 1 && remainingCount > 0) {
            return (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                {renderPreview(file, index)}
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  +{remainingCount}
                </div>
              </div>
            );
          }
          return renderPreview(file, index);
        })}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">All Attachments</h2>
            <div className="grid grid-cols-2 gap-4">
              {files.map((file, index) => renderPreview(file, index))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

FilePreviewFromCloudinary.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilePreviewFromCloudinary;

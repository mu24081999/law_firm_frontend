import React from "react";
import PropTypes from "prop-types";
const FilePreviewFromCloudinary = ({ files }) => {
  const renderPreview = (file, index) => {
    const { name, type, url } = file;

    if (type.startsWith("image/")) {
      return (
        <img key={index} src={url} alt={name} className="w-40 h-auto rounded" />
      );
    }

    if (type.startsWith("video/")) {
      return (
        <video key={index} controls className="w-60 h-auto rounded">
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <audio key={index} controls className="w-full">
          <source src={url} type={type} />
          Your browser does not support the audio tag.
        </audio>
      );
    }

    // PDF, DOCX, etc.
    return (
      <div key={index} className="border p-3 rounded bg-gray-100">
        <p className="font-semibold">{name}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm"
        >
          View / Download
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {files?.map((file, index) => renderPreview(file, index))}
    </div>
  );
};
FilePreviewFromCloudinary.propTypes = {
  files: PropTypes.array,
};
export default FilePreviewFromCloudinary;

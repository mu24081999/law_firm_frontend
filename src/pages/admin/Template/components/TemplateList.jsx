import React from "react";

const TemplateList = ({ templates }) => {
  if (!templates || templates.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No templates uploaded yet.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Uploaded Templates
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition"
          >
            {template.preview_url ? (
              <img
                src={template.preview_url}
                alt={`${template.name} preview`}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400">
                No Preview
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-700 truncate">
              {template.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
              {template.description}
            </p>
            <div className="text-xs text-gray-400">
              Pages: {template.pages?.length || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateList;

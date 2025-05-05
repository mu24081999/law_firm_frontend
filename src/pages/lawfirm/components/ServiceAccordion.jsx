import React, { useState } from "react";
import DynamicFormBuilder from "../../components/Steps/DynamicForm";
import PropTypes from "prop-types";
const ServiceAccordion = ({
  servicesData,
  handleServiceChange,
  handleSaveSettings,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="space-y-6">
      {servicesData?.map((service, index) => (
        <div key={index} className="border rounded-lg">
          {/* Accordion Header */}
          <div
            className="flex items-center justify-between p-6 cursor-pointer"
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <h3 className="text-lg font-medium text-gray-900">
              {service?.name}
            </h3>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                expandedIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {/* Accordion Content */}
          {expandedIndex === index && (
            <div className="p-6 border-t space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Enable Service
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      service?.customServiceFields?.[0]?.status === "active"
                    }
                    onChange={(e) => {
                      handleServiceChange(
                        service.id,
                        service?.customServiceFields?.[0]?.id,
                        "status",
                        e.target.checked ? "active" : "inactive"
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    value={service?.customServiceFields?.[0]?.price || "0"}
                    onChange={(e) =>
                      handleServiceChange(
                        service?.id,
                        service?.customServiceFields?.[0]?.id,
                        "price",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Processing Time
                  </label>
                  <input
                    type="text"
                    value={
                      service?.customServiceFields?.[0]?.processingTime || ""
                    }
                    onChange={(e) =>
                      handleServiceChange(
                        service?.id,
                        service?.customServiceFields?.[0]?.id,
                        "processingTime",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={service?.customServiceFields?.[0]?.description || ""}
                    onChange={(e) =>
                      handleServiceChange(
                        service?.id,
                        service?.customServiceFields?.[0]?.id,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Add Service Steps & Fields
                  </label>
                  <div className="mt-2 space-y-2">
                    <DynamicFormBuilder
                      handleServiceChange={handleServiceChange}
                      serviceParams={{
                        serviceId: service.id,
                        serviceFieldId: service?.customServiceFields?.[0]?.id,
                        fieldName: "requirements",
                      }}
                      defaultValue={
                        service?.customServiceFields?.[0]?.requirements
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};
ServiceAccordion.propTypes = {
  servicesData: PropTypes.array,
  handleServiceChange: PropTypes.func,
  handleSaveSettings: PropTypes.func,
};
export default ServiceAccordion;

import React from "react";
import { useState } from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import Button from "../../components/Button";
const Integrations = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      title: "Paymob",
      description: "Local Payment Gateway in Pakistan",
      icon: <RiSecurePaymentLine size={50} />,
      status: "active",
    },
  ]);
  console.log("🚀 ~ Integrations ~ integrations:", integrations);
  const handleIntegrationChange = (id, status) => {
    setIntegrations((prevIntegrations) =>
      prevIntegrations.map((integration) =>
        integration.id === id ? { ...integration, status: status } : integration
      )
    );
  };
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Integrations
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations?.map((service, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-4">
                    {/* <img src={service?.icon_url} width={50} /> */}
                    {service?.icon}
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    {service?.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{service?.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={service.status === "active" ? true : false}
                    onChange={(e) => {
                      handleIntegrationChange(
                        service.id,
                        e.target.checked ? "active" : "inactive"
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex space-x-3">
                <Button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;

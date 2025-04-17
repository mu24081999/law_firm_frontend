import { useEffect, useState } from "react";
import ServiceRequests from "./ServiceRequests";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceFieldsApi } from "../../redux/services/service";
import Modal from "../../components/Modal";
import AddServiceForm from "../components/Services/AddServiceForm";
import { useNavigate } from "react-router";
function LawFirmServices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { services } = useSelector((state) => state.service);
  const [showRequests, setShowRequests] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const services = [
  //   {
  //     title: "Personal Tax Filing",
  //     description: "Assist clients with personal income tax returns",
  //     icon: "📋",
  //     status: "Available",
  //     pendingRequests: 2,
  //   },
  //   {
  //     title: "Family Tax Filing",
  //     description: "Help families manage their tax filing",
  //     icon: "👨‍👩‍👧‍👦",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "NTN Registration",
  //     description: "Guide clients through NTN registration process",
  //     icon: "🆔",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "NTN Finder",
  //     description: "Help clients locate their National Tax Number",
  //     icon: "🔍",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "ATL Status Check",
  //     description: "Verify Active Taxpayer List status for clients",
  //     icon: "✓",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "IRIS Profile Update",
  //     description: "Assist with IRIS portal profile management",
  //     icon: "👤",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "Business Incorporation",
  //     description: "Complete business registration process",
  //     icon: "🏢",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "GST Registration",
  //     description: "Handle GST registration for businesses",
  //     icon: "📊",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "IP Registration",
  //     description: "Manage intellectual property registration",
  //     icon: "💡",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  //   {
  //     title: "USA LLC Formation",
  //     description: "Facilitate LLC formation in the United States",
  //     icon: "🌎",
  //     status: "Available",
  //     pendingRequests: 0,
  //   },
  // ];

  if (showRequests) {
    return (
      <>
        <button
          onClick={() => setShowRequests(false)}
          className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <span className="mr-2">←</span> Back to Services
        </button>
        <ServiceRequests service={selectedService} />
      </>
    );
  }
  useEffect(() => {
    dispatch(getAllServiceFieldsApi(token));
  }, [dispatch, token]);
  const handleModalOpen = (value) => {
    setIsOpen(value);
  };
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Manage Services
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mb-5"
        >
          Add New Service
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services?.map((service, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl mb-4">
                  <img src={service?.icon_url} width={50} />
                </div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  {service?.name}
                </h2>
                <p className="text-gray-600 mb-4">{service?.description}</p>
                {service.pendingRequests > 0 && (
                  <p className="text-sm text-indigo-600 mb-4">
                    {service?.pendingRequests} pending requests
                  </p>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  service?.status === "acitve"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {/* {service.status} */}
                Pending Approval
              </span>
            </div>
            <div className="flex space-x-3">
              {/* <button
                onClick={() => {
                  setSelectedService(service);
                  setShowRequests(true);
                }}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
              >
                View Requests
              </button> */}
              <button
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors duration-200"
                onClick={() => navigate("/lawfirm/settings")}
              >
                Manage Service
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Service Form"
        body={<AddServiceForm afterSubmit={handleModalOpen} />}
      />
    </div>
  );
}

export default LawFirmServices;

import { useEffect, useState } from "react";
import ServiceRequestForm from "../../components/ServiceRequestForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceFieldsApi } from "../../redux/services/service";
import Modal from "../../components/Modal";
import AddRequestForm from "./components/AddRequestForm";
function UserServices() {
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { services: data } = useSelector((state) => state.service);
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const services = [
  //   {
  //     title: "Personal Tax Filing",
  //     description: "File your personal income tax returns",
  //     icon: "📋",
  //     price: "5,000",
  //   },
  //   {
  //     title: "Family Tax Filing",
  //     description: "Manage tax filing for your family members",
  //     icon: "👨‍👩‍👧‍👦",
  //     price: "8,000",
  //   },
  //   {
  //     title: "NTN Registration",
  //     description: "Register for National Tax Number",
  //     icon: "🆔",
  //     price: "3,000",
  //   },
  //   {
  //     title: "NTN Finder",
  //     description: "Find your National Tax Number",
  //     icon: "🔍",
  //     price: "1,000",
  //   },
  //   {
  //     title: "ATL Status Check",
  //     description: "Check Active Taxpayer List status",
  //     icon: "✓",
  //     price: "1,500",
  //   },
  //   {
  //     title: "IRIS Profile Update",
  //     description: "Update your IRIS portal profile",
  //     icon: "👤",
  //     price: "2,000",
  //   },
  //   {
  //     title: "Business Incorporation",
  //     description: "Register your business",
  //     icon: "🏢",
  //     price: "15,000",
  //   },
  //   {
  //     title: "GST Registration",
  //     description: "Register for General Sales Tax",
  //     icon: "📊",
  //     price: "10,000",
  //   },
  //   {
  //     title: "IP Registration",
  //     description: "Register and protect your intellectual property",
  //     icon: "💡",
  //     price: "20,000",
  //   },
  //   {
  //     title: "USA LLC Formation",
  //     description: "Form your LLC in the United States",
  //     icon: "🌎",
  //     price: "50,000",
  //   },
  // ];
  useEffect(() => {
    dispatch(getAllServiceFieldsApi(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (data.length > 0) {
      setServices(data);
    }
  }, [data]);
  const handleCloseModal = (value) => {
    setIsOpen(value);
  };
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Available Tax Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-3xl mb-4">
              <img src={service?.icon_url} width={50} />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {service?.name}
            </h2>
            <p className="text-gray-600 mb-4">{service?.description}</p>
            <p className="text-lg font-semibold text-indigo-600 mb-4">
              Rs. {service?.customServiceFields?.[0]?.price}
            </p>
            <button
              onClick={() => {
                setSelectedService(service);
                setIsOpen(true);
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            >
              Request Service
            </button>
          </div>
        ))}
      </div>
      {/* 
      {selectedService && (
        <ServiceRequestForm
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )} */}
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={selectedService?.name}
          body={
            <AddRequestForm
              fields={selectedService?.customServiceFields?.[0]?.requirements}
              service={selectedService}
              handleModalOpen={handleCloseModal}
            />
          }
        />
      </div>
    </div>
  );
}

export default UserServices;

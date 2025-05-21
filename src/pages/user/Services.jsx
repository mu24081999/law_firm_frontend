import { useEffect, useState } from "react";
import ServiceRequestForm from "../../components/ServiceRequestForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addBankRecieptApi,
  addServiceRequestApi,
  getAllServiceFieldsApi,
} from "../../redux/services/service";
import Modal from "../../components/Modal";
import AddRequestForm from "./components/AddRequestForm";
import DynamicFormRenderer from "../components/StepsRenderer/DynamicFormRender";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import FileField from "../../components/FormFields/FileField/FileField";
import { useForm } from "react-hook-form";
import useSocket from "../../context/SocketContext/useSocket";
function UserServices() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { firmId } = useParams();
  const { pushNotification } = useSocket();
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const { services: data } = useSelector((state) => state.service);
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const handleAddRequest = async (formData) => {
    const params = {
      userId: user.id,
      serviceId: selectedService.id,
      firmId: firmId,
      ...formData,
    };
    const done = await dispatch(addServiceRequestApi(token, params));
    if (done) {
      const notificationParams = {
        userId: firmId,
        description: `${user?.email} has requested ${selectedService?.name} service.`,
        message: `You've a service request.`,
        userType: "lawfirm",
        messageType: "service-request",
        link: "/lawfirm/service-requests",
      };
      const notificationParamsTwo = {
        userId: user?.id,
        description: `You've requested ${selectedService?.name} service.`,
        message: `Servive request.`,
        userType: "client",
        messageType: "service-request",
        link: "/user/requests",
      };
      await pushNotification(notificationParams);
      await pushNotification(notificationParamsTwo);
      setIsOpen(false);
      setPaymentFormOpen(true);
    }
  };
  const handleSubmitPaymentProof = (formData) => {
    const params = {
      userId: user.id,
      serviceId: selectedService?.serviceId,
      serviceRequestId: selectedService?.id,
      reciept: formData.reciept,
    };
    dispatch(addBankRecieptApi(token, params));
    setIsOpen(false);
  };
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
  const bankDetails = {
    accountName: "John Wick",
    accountNumber: "1234567890123456",
    bankName: "Chase Bank",
    ifscCode: "CHASUS33XXX", // or SWIFT code depending on country
    branch: "New York - Manhattan Branch",
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
            <Button
              onClick={() => {
                setSelectedService(service);
                setIsOpen(true);
              }}
            >
              Request Service
            </Button>
            {/* <button
              onClick={() => {
                setSelectedService(service);
                setIsOpen(true);
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            >
              Request Service
            </button> */}
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
      {selectedService?.customServiceFields && (
        <div>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={selectedService?.name}
            size="xl"
            noStartMargin={window.innerWidth > 700 ? false : true}
            body={
              <DynamicFormRenderer
                formSchema={
                  typeof selectedService?.customServiceFields?.[0]
                    ?.requirements === "string"
                    ? JSON.parse(
                        selectedService?.customServiceFields?.[0]?.requirements
                      )
                    : selectedService?.customServiceFields?.[0]?.requirements
                }
                onSubmit={handleAddRequest}
              />
            }
          />
        </div>
      )}
      <Modal
        isOpen={paymentFormOpen}
        onClose={() => setPaymentFormOpen(false)}
        title="Payment Reciept"
        body={
          <>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🏦 Bank Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Account Name:</strong>{" "}
                  {bankDetails?.accountName || "N/A"}
                </div>
                <div>
                  <strong>Account Number:</strong>{" "}
                  {bankDetails?.accountNumber || "N/A"}
                </div>
                <div>
                  <strong>Bank Name:</strong> {bankDetails?.bankName || "N/A"}
                </div>
                <div>
                  <strong>IFSC Code:</strong> {bankDetails?.ifscCode || "N/A"}
                </div>
                <div>
                  <strong>Branch:</strong> {bankDetails?.branch || "N/A"}
                </div>
              </div>
            </section>
            <form onSubmit={handleSubmit(handleSubmitPaymentProof)}>
              <FileField
                name={"reciept"}
                control={control}
                errors={errors}
                label={"Reciept"}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <Button type="submit">Submit</Button>
            </form>
          </>
        }
      />
    </div>
  );
}

export default UserServices;

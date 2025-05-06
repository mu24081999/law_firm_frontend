import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import { format } from "date-fns";
import {
  addBankRecieptApi,
  getAllServiceRequests,
} from "../../redux/services/service";
import Modal from "../../components/Modal";
import FileField from "../../components/FormFields/FileField/FileField";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

const Requests = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { serviceRequests } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  console.log("🚀 ~ Requests ~ selectedService:", selectedService);
  const [tableData, setTableData] = useState([]);

  const { token, user } = useSelector((state) => state.auth);
  const { clients, isLoading } = useSelector((state) => state.firm);
  const columns = [
    { label: "Order ID", accessor: "orderId" },
    { label: "Service Name", accessor: "serviceName" },
    { label: "Amount Paid", accessor: "amount" },
    { label: "Status", accessor: "payment_status" },
    { label: "Created At", accessor: "createdAt" },

    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];
  useEffect(() => {
    if (user?.id) {
      let query = `userId=${user?.id}`;
      dispatch(getAllServiceRequests(token, query));
    }
  }, [user, token, dispatch]);
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
    const data = [];
    Array.isArray(serviceRequests) &&
      serviceRequests?.map((request) => {
        data.push({
          ...request,
          orderId: request?.id?.slice(0, 10),

          serviceName: (
            <div className="flex items-center justify-center gap-2">
              <div>
                <img src={request?.service?.icon_url} width={60} />
              </div>
              <div>{request?.service?.name}</div>
            </div>
          ),
          createdAt: format(request?.createdAt, "dd MMM yyyy"),
          actions: [
            {
              color: "green",
              // loading: isLoading,
              label: "upload payment reciept",
              onClick: () => {
                console.log("click");
                setSelectedService(request);
                setIsOpen(true);
              },
            },
          ],
        });
      });

    setTableData(data);
    return () => {};
  }, [serviceRequests, isLoading, dispatch, token, user]);
  const bankDetails = {
    accountName: "John Wick",
    accountNumber: "1234567890123456",
    bankName: "Chase Bank",
    ifscCode: "CHASUS33XXX", // or SWIFT code depending on country
    branch: "New York - Manhattan Branch",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Service Requests{" "}
      </h1>
      <div>
        {tableData?.length > 0 ? (
          <Table
            columns={columns}
            pagination={false}
            data={tableData}
            actions={true}
          />
        ) : (
          <div className="text-center bg-white py-5">No Data Found</div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
              <Button type="submit">Continue</Button>
            </form>
          </>
        }
      />
    </div>
  );
};

export default Requests;

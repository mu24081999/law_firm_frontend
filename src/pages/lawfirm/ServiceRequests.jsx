import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceRequests } from "../../redux/services/service";
import { format } from "date-fns";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import ServiceRequestDetails from "./components/ServiceRequestDetails";

function ServiceRequests() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { serviceRequests, isLoading } = useSelector((state) => state.service);
  const [selectedService, setSelectedService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Simulated requests data - in real app, fetch from backend
  const [requests] = useState([
    {
      id: "ORD-1234567890",
      service: "Personal Tax Filing",
      clientName: "Ahmed Khan",
      status: "pending",
      date: "2024-03-15",
      amount: "5,000",
    },
  ]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  useEffect(() => {
    if (user?.id) {
      let query = `firmId=${user?.id}`;
      dispatch(getAllServiceRequests(token, query));
    }
  }, [user, token, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(serviceRequests) &&
      serviceRequests?.map((request) => {
        data.push({
          ...request,
          orderId: request?.id?.slice(0, 10),
          client: request?.requestBy?.email,
          serviceName: (
            <div className="flex items-center justify-center gap-2">
              <div>
                <img src={request?.service?.icon_url} width={60} />
              </div>
              <div>{request?.service?.name}</div>
            </div>
          ),
          status: (
            <select name="status">
              <option value="pending" selected={request?.status === "pending"}>
                Pending
              </option>
              <option value="active" selected={request?.status === "active"}>
                Active
              </option>
              <option
                value="completed"
                selected={request?.status === "completed"}
              >
                Completed
              </option>
            </select>
          ),
          createdAt: format(request?.createdAt, "dd MMM yyyy"),
          actions: [
            {
              color: "green",
              // loading: isLoading,
              label: " Details",
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
  const columns = [
    { label: "Order ID", accessor: "orderId" },

    { label: "Service Name", accessor: "serviceName" },
    { label: "CLient", accessor: "client" },
    { label: "Amount Paid", accessor: "amount" },
    { label: "Payment Status", accessor: "payment_status" },
    { label: "Confirm Status", accessor: "status" },
    { label: "Created At", accessor: "createdAt" },

    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Service Requests
      </h1>
      <div>
        {tableData?.length > 0 ? (
          <Table
            columns={columns}
            pagination={false}
            data={tableData}
            actions={true}
            exportData={true}
          />
        ) : (
          <div className="text-center bg-white py-5">No Data Found</div>
        )}
      </div>
      {selectedService && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Request Details"
          size="xl"
          body={<ServiceRequestDetails data={selectedService} />}
        />
      )}
    </div>
  );
}

export default ServiceRequests;

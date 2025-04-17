import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import { format } from "date-fns";
import { getAllServiceRequestsByUserId } from "../../redux/services/service";

const Requests = () => {
  const { serviceRequests } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  console.log("🚀 ~ Requests ~ serviceRequests:", tableData);

  const { token, user } = useSelector((state) => state.auth);
  const { clients, isLoading } = useSelector((state) => state.firm);
  const columns = [
    { label: "Service Name", accessor: "serviceName" },
    { label: "Amount Paid", accessor: "amount" },
    { label: "Status", accessor: "payment_status" },
    { label: "Created At", accessor: "createdAt" },

    // {
    //   label: "Actions",
    //   accessor: "actions",
    //   type: "actions",
    //   variant: "green",
    // },
  ];
  useEffect(() => {
    dispatch(getAllServiceRequestsByUserId(token, user?.id));
  }, [user, token, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(serviceRequests) &&
      serviceRequests?.map((request) => {
        data.push({
          ...request,
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
              label: "Claim Number",
            },
          ],
        });
      });

    setTableData(data);
    return () => {};
  }, [serviceRequests, isLoading, dispatch, token, user]);

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
            actions={false}
          />
        ) : (
          <div className="text-center bg-white py-5">No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default Requests;

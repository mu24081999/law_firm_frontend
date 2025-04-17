import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientsApi } from "../../redux/services/firm";
import Table from "../../components/Table";
import { format } from "date-fns";

const LawFirmClients = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const { token, user } = useSelector((state) => state.auth);
  const { clients, isLoading } = useSelector((state) => state.firm);
  const columns = [
    { label: "Avatar", accessor: "avatar" },
    { label: "First Name", accessor: "firstname" },
    { label: "lastname", accessor: "lastname" },
    { label: "email", accessor: "email" }, // Example of nested accessor
    { label: "username", accessor: "username" },
    { label: "Phone Number", accessor: "phoneNumber" },
    { label: "Joined at", accessor: "createdAt" },

    // {
    //   label: "Actions",
    //   accessor: "actions",
    //   type: "actions",
    //   variant: "green",
    // },
  ];
  useEffect(() => {
    dispatch(getClientsApi(token, user?.id));
  }, [user, token, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(clients) &&
      clients?.map((client) => {
        data.push({
          ...client,
          avatar: (
            <img
              src={client?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          ),
          createdAt: format(client?.createdAt, "dd MMM yyyy"),
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
  }, [clients, isLoading, dispatch, token, user]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Manage Clients
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
          <div className="text-center bg-white py-5">No Numbers Found</div>
        )}
      </div>
      {/* <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                No clients found
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default LawFirmClients;

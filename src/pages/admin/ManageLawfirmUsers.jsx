import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersApi, updateUserApi } from "../../redux/services/users";
import { format } from "date-fns";
import { loginUser } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import StatusTag from "../../components/StatusTag";
import Modal from "../../components/Modal";
import SubscriptionReceiptCard from "./components/SubscriptionRecieptCard";
function ManageLawfirmUsers() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReciept, setSelectedReciept] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const columns = [
    { label: "Avatar", accessor: "avatar" },
    { label: "First Name", accessor: "firstname" },
    { label: "lastname", accessor: "lastname" },
    { label: "email", accessor: "email" }, // Example of nested accessor
    { label: "Account Type", accessor: "accountType" },
    { label: "username", accessor: "username" },
    { label: "Phone Number", accessor: "phoneNumber" },
    { label: "Joined at", accessor: "createdAt" },
    { label: "Recent Subscription Status", accessor: "subscriptionStatus" },
    { label: "Account Status", accessor: "status" },

    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];
  useEffect(() => {
    dispatch(getUsersApi(token));
  }, [dispatch, token]);
  useEffect(() => {
    const data = [];
    Array.isArray(users?.usersData) &&
      users?.usersData?.map((client) => {
        data.push({
          ...client,
          subscriptionStatus: (
            <StatusTag
              status={
                client?.subscriptions?.[0]?.subscriptionReciept?.status ===
                "confirm"
                  ? "active"
                  : client?.subscriptions?.[0]?.subscriptionReciept?.status
              }
            />
          ),
          status: (
            <div className="w-48">
              <select
                value={client?.blocked}
                onChange={(e) => handleChange(e.target.value, client?.id)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={false}>Active</option>
                <option value={true}>Blocked</option>
              </select>
            </div>
          ),
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
              label: "Login",

              onClick: async () => {
                let Params = {
                  passwordType: "decrypted",
                  email: client?.email,
                  password: client?.password,
                };
                const logged_in = await dispatch(loginUser(Params));
                if (logged_in?.success) {
                  navigateTo(`/lawfirm`);
                }
              },
            },
            {
              disabled: !client?.subscriptions?.[0]?.subscriptionReciept?.id,
              color: "green",
              // loading: isLoading,
              label: "Details",

              onClick: async () => {
                setIsOpen(true);
                setSelectedReciept(
                  client?.subscriptions?.[0]?.subscriptionReciept
                );
              },
            },
          ],
        });
      });

    setTableData(data);
    return () => {};
  }, [users, dispatch, token, navigateTo]);
  const handleClose = () => {
    setIsOpen(false);
    setSelectedReciept(null);
  };
  const handleChange = (status, userId) => {
    dispatch(
      updateUserApi(
        token,
        {
          blocked: status,
        },
        userId,
        false
      )
    );
  };
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Manage Law Firm Users
      </h1>
      <div className="overflow-x-auto">
        <div>
          {tableData?.length > 0 ? (
            <Table
              columns={columns}
              pagination={false}
              data={tableData}
              actions={false}
              exportData={true}
            />
          ) : (
            <div className="text-center bg-white py-5">No Data Found</div>
          )}
        </div>
      </div>
      {selectedReciept && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Reciept Details"
          noStartMargin={true}
          size="sm"
          body={
            <SubscriptionReceiptCard
              subscriptionReciept={selectedReciept}
              handleClose={handleClose}
            />
          }
        />
      )}
    </div>
  );
}

export default ManageLawfirmUsers;

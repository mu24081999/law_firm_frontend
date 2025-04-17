import { useState } from "react";
import TeamChat from "../../components/TeamChat";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField/InputField";
import Button from "../../components/Button";
import ReactSelectField from "../../components/FormFields/ReactSelectField/ReactSelectField";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInvitationsApi,
  getUserMembersApi,
  sendInvitationApi,
} from "../../redux/services/team";
import { useEffect } from "react";
import Table from "../../components/Table";
import { format } from "date-fns";
function Team() {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [membersTableData, setMembersTableData] = useState([]);
  const [memberPagination, setMemberPagination] = useState({});
  const [invitationsTableData, setInvitationsTableData] = useState([]);
  const [invitationPagination, setInvitationPagination] = useState({});
  const { isLoading, invitations, members } = useSelector(
    (state) => state.team
  );
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
    },
  ]);
  const membersColumns = [
    { label: "User", accessor: "user" },
    { label: "Role", accessor: "role" },
    { label: "Created At", accessor: "createdAt" },
    // {
    //   label: "Actions",
    //   accessor: "actions",
    //   type: "actions",
    //   variant: "green",
    // },
  ];
  const invitationColumns = [
    { label: "First Name", accessor: "firstname" },
    { label: "Last Name", accessor: "lastname" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
    { label: "Status", accessor: "status" },
  ];
  const handleInvite = (formData) => {
    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      role: formData.role.value,
      ownerId: user?.id,
    };
    dispatch(sendInvitationApi(token, data));
    setShowInviteModal(false);
  };

  const handleRemoveMember = (id) => {
    setTeam(team.filter((member) => member.id !== id));
  };
  const fetchMemberData = (page) => {
    const query = `page=${page}`;
    dispatch(getUserMembersApi(token, user?.id, query));
  };
  useEffect(() => {
    dispatch(getUserMembersApi(token, user?.id));
    dispatch(getUserInvitationsApi(token, user?.id));
  }, [token, user, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(members?.members) &&
      members?.members?.map((member) => {
        data.push({
          ...member,
          user: (
            <div className="flex items-center space-x-4">
              <img
                src={
                  member.avatar ||
                  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                alt={member?.firstname}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {member?.firstname + " " + member?.lastname}
                </p>
                <p className="text-sm text-gray-500">{member?.email}</p>
              </div>
            </div>
          ),
          createdAt: format(member?.createdAt, "dd MMM yyyy"),
          actions: [
            {
              color: "green",
              // loading: isLoading,
              label: "Claim Number",
            },
          ],
        });
      });

    setMembersTableData(data);
    setMemberPagination(members?.pagination);
    return () => {};
  }, [members, isLoading, dispatch, token, user]);
  useEffect(() => {
    const data = [];
    Array.isArray(invitations?.invitations) &&
      invitations?.invitations?.map((invitation) => {
        data.push({
          ...invitation,

          actions: [
            {
              color: "green",
              // loading: isLoading,
              label: "Claim Number",
            },
          ],
        });
      });

    setInvitationsTableData(data);
    setInvitationPagination(invitations?.pagination);
    return () => {};
  }, [invitations, isLoading, dispatch, token, user]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Team Management
        </h1>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Invite Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Team Members
            </h2>
            <div className="space-y-4">
              <Table
                columns={membersColumns}
                data={membersTableData}
                totalItems={memberPagination?.totalItems}
                itemsPerPage={10}
                onPageChange={(page) => fetchMemberData(page)}
                actions={false}
                pagination={true}
              />
            </div>
          </div>
        </div>

        {/* Team Chat */}
        <div className="bg-white shadow rounded-lg overflow-hidden p-6">
          {/* <TeamChat /> */}
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Team Invitations
          </h2>
          <Table
            columns={invitationColumns}
            data={invitationsTableData}
            totalItems={memberPagination?.totalItems}
            itemsPerPage={10}
            onPageChange={(page) => fetchMemberData(page)}
            actions={false}
            pagination={true}
          />
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invite Team Member
            </h3>
            <div className="px-5">
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit(handleInvite)}
              >
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <InputField
                      name="firstname"
                      control={control}
                      //   disabled={member?.id ? true : false}
                      errors={errors}
                      label="First Name"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />{" "}
                  </div>
                  <div>
                    <InputField
                      name="lastname"
                      control={control}
                      //   disabled={member?.id ? true : false}
                      errors={errors}
                      label="Last Name"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />{" "}
                  </div>
                </div>
                <div>
                  <InputField
                    name="email"
                    type="email"
                    control={control}
                    // disabled={member?.id ? true : false}
                    errors={errors}
                    label="Email Address"
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />{" "}
                </div>
                <div className="py-2">
                  <ReactSelectField
                    name="role"
                    placeholder="Role"
                    label="Role"
                    control={control}
                    errors={errors}
                    mb={false}
                    options={[
                      {
                        label: "Admin",
                        value: "admin",
                      },
                      {
                        label: "User",
                        value: "user",
                      },
                    ]}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  loading={isLoading}
                  className="py-3 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Invite
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;

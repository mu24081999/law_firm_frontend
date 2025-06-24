import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUsersApi, upsertPermission } from "../../redux/services/users";
import ReactSelectField from "../../components/FormFields/ReactSelectField/ReactSelectField";
import Switcher from "../../components/FormFields/Switcher/Switcher";

const moduleList = [
  { key: "dashboard", label: "Dashboard" },
  { key: "clients", label: "Clients" },
  { key: "services", label: "Services" },
  { key: "service_requests", label: "Service Requests" },
  { key: "template_editor", label: "Template Editor" },
  { key: "team_chat", label: "Team Chat" },
  { key: "client_chat", label: "Client Chat" },
  { key: "case_management", label: "Case Management" },
  { key: "leads_management", label: "Leads Management" },
  { key: "calendar", label: "Calendar & Scheduling" },
  { key: "task_management", label: "Task Management" },
  { key: "billing", label: "Billing & Invoicing" },
  { key: "settings", label: "Settings" },
  { key: "payment_integrations", label: "Payment Integrations" },
];

const Permission = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: moduleList.reduce(
      (acc, mod) => ({ ...acc, [mod.key]: false }),
      { user: null }
    ),
  });

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const query = `lawfirm=true`;
    dispatch(getUsersApi(token, query));
  }, [dispatch, token]);

  useEffect(() => {
    if (users?.usersData?.length) {
      const formatted = users.usersData.map((client) => ({
        label: `${client.firstname} ${client.lastname}`,
        value: client.id,
        ...client,
      }));
      setUsersData(formatted);
    }
  }, [users]);

  const onSubmit = (data) => {
    const userId = data?.user?.value;

    if (!userId) {
      alert("Please select a user.");
      return;
    }

    const permissions = moduleList.reduce((acc, mod) => {
      acc[mod.key] = data[mod.key] || false;
      return acc;
    }, {});

    const payload = {
      userId,
      ...permissions,
    };

    console.log("Payload to send:", payload);
    dispatch(upsertPermission(token, payload));
  };
  const handleFirmChange = (user) => {
    if (user?.permissions) {
      moduleList.forEach((mod) => {
        setValue(mod.key, user.permissions[mod.key] || false);
      });
    } else {
      moduleList.forEach((mod) => {
        setValue(mod.key, false);
      });
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Module Permissions
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2">
          <ReactSelectField
            name="user"
            placeholder="Select a Firm"
            label="Law Firm"
            control={control}
            onChange={(e) => {
              handleFirmChange(e);
            }}
            errors={errors}
            mb={false}
            options={usersData}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 pt-4">
          Permissions
        </h2>

        <div className="grid md:grid-cols-2 gap-6 pt-2">
          {moduleList.map((mod) => (
            <Switcher
              key={mod.key}
              name={mod.key}
              control={control}
              label={mod.label}
              defaultValue={false}
            />
          ))}
        </div>

        <div className="pt-6 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
          >
            Save Permissions
          </button>
        </div>
      </form>
    </div>
  );
};

export default Permission;

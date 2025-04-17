import { useEffect, useState } from "react";
import ServiceForm from "../components/Services/AddServiceForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteServiceApi,
  getAllServiceFieldsApi,
} from "../../redux/services/service";

function Services() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { services: data } = useSelector((state) => state.service);
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterTag, setFilterTag] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleAddContact = (data) => {
    const newContact = {
      id: Date.now(),
      ...data,
    };
    setServices([...services, newContact]);
    setShowForm(false);
  };

  const handleUpdateContact = (data) => {
    setServices(
      services.map((contact) =>
        contact.id === selectedContact.id ? { ...contact, ...data } : contact
      )
    );
    setSelectedContact(null);
    setShowForm(false);
  };

  const filteredContacts = services.filter((contact) => {
    const matchesTag = !filterTag || contact.tags.includes(filterTag);
    const matchesStatus = !filterStatus || contact.status === filterStatus;
    return matchesTag && matchesStatus;
  });

  const allTags = [...new Set(services.flatMap((contact) => contact.tags))];
  useEffect(() => {
    dispatch(getAllServiceFieldsApi(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (data.length > 0) {
      setServices(data);
    }
  }, [data]);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <button
          onClick={() => {
            setSelectedContact(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {showForm ? (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedContact ? "Edit Service" : "New Service"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedContact(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <ServiceForm
            onSubmit={selectedContact ? handleUpdateContact : handleAddContact}
            initialData={selectedContact}
          />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
              {filteredContacts?.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {service?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {service?.email || "mu24081999@gmail.com"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service?.phone || "+923174660027"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={service?.icon_url} width={50} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {service?.description?.slice(0, 100)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : service?.status === "not-approved"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {service?.status || "Approved"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedContact(service);
                        setShowForm(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch(deleteServiceApi(token, service.id))
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Services;

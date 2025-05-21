import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import StatusBadge from "../components/common/StatusBadge";
import {
  PlusIcon,
  UserGroupIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
function LeadsManagement() {
  const [view, setView] = useState("kanban");
  // Mock leads data
  const leads = [
    {
      id: 1,
      name: "Robert Johnson",
      company: "Johnson Industries",
      email: "robert@johnson.com",
      phone: "(555) 123-4567",
      status: "New",
      source: "Website",
      assignedTo: "Jane Smith",
      lastContact: "2023-10-14",
      notes: "Interested in corporate legal services.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "Individual",
      email: "sarah.w@example.com",
      phone: "(555) 987-6543",
      status: "Contacted",
      source: "Referral",
      assignedTo: "Mike Brown",
      lastContact: "2023-10-12",
      notes: "Looking for estate planning advice.",
    },
    {
      id: 3,
      name: "David Chen",
      company: "Chen Technologies",
      email: "david@chentech.com",
      phone: "(555) 456-7890",
      status: "Qualified",
      source: "Conference",
      assignedTo: "Jane Smith",
      lastContact: "2023-10-10",
      notes: "Needs assistance with patent applications.",
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      company: "Individual",
      email: "maria.r@example.com",
      phone: "(555) 234-5678",
      status: "Proposal",
      source: "Social Media",
      assignedTo: "John Doe",
      lastContact: "2023-10-08",
      notes: "Divorce case, follow up with fee structure.",
    },
    {
      id: 5,
      name: "Thomas Wilson",
      company: "Wilson & Sons",
      email: "thomas@wilsonsons.com",
      phone: "(555) 876-5432",
      status: "Negotiation",
      source: "Website",
      assignedTo: "Mike Brown",
      lastContact: "2023-10-05",
      notes: "Family business succession planning.",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      company: "Individual",
      email: "jennifer.l@example.com",
      phone: "(555) 345-6789",
      status: "Won",
      source: "Referral",
      assignedTo: "Jane Smith",
      lastContact: "2023-10-01",
      notes: "Personal injury case, agreement signed.",
    },
    {
      id: 7,
      name: "Michael Baker",
      company: "Baker Enterprises",
      email: "michael@bakerenterprises.com",
      phone: "(555) 654-3210",
      status: "Lost",
      source: "Website",
      assignedTo: "John Doe",
      lastContact: "2023-09-28",
      notes: "Went with another firm due to pricing concerns.",
    },
  ];
  // Group leads by status for Kanban view
  const groupedLeads = leads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }
    acc[lead.status].push(lead);
    return acc;
  }, {});
  // Define Kanban columns
  const kanbanColumns = [
    { id: "new", title: "New", color: "bg-blue-100 text-blue-800" },
    {
      id: "contacted",
      title: "Contacted",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "qualified",
      title: "Qualified",
      color: "bg-indigo-100 text-indigo-800",
    },
    { id: "proposal", title: "Proposal", color: "bg-amber-100 text-amber-800" },
    {
      id: "negotiation",
      title: "Negotiation",
      color: "bg-orange-100 text-orange-800",
    },
    { id: "won", title: "Won", color: "bg-green-100 text-green-800" },
    { id: "lost", title: "Lost", color: "bg-red-100 text-red-800" },
  ];

  // Lead card component
  const LeadCard = ({ lead }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-900">{lead.name}</h4>
        <button className="p-1 rounded-full hover:bg-gray-100">
          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {lead.company !== "Individual" && (
        <p className="text-sm text-gray-500 mt-1">{lead.company}</p>
      )}

      <div className="mt-3 space-y-2">
        <div className="flex items-center text-sm">
          <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-600 truncate">{lead.email}</span>
        </div>
        <div className="flex items-center text-sm">
          <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-600">{lead.phone}</span>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center text-xs">
        <span className="text-gray-500">Assigned: {lead.assignedTo}</span>
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          {lead.source}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Leads Management"
        subtitle="Track, manage, and convert your leads into clients"
        actions={
          <button className="btn btn-primary inline-flex items-center">
            <PlusIcon className="w-5 h-5 mr-1" />
            New Lead
          </button>
        }
      />

      {/* View toggle */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              view === "kanban"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              view === "list"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            List
          </button>
        </div>
        <div>
          <select className="form-input text-sm py-1 px-3">
            <option>All Sources</option>
            <option>Website</option>
            <option>Referral</option>
            <option>Social Media</option>
            <option>Conference</option>
          </select>
        </div>
      </div>

      {/* Kanban View */}
      {view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-6">
          {kanbanColumns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-72 bg-gray-50 rounded-lg p-3"
            >
              <div className="flex justify-between items-center mb-3">
                <h3
                  className={`text-sm font-medium px-2 py-1 rounded ${column.color}`}
                >
                  {column.title}
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  {groupedLeads[column.title]?.length || 0}
                </span>
              </div>

              <div className="space-y-3">
                {groupedLeads[column.title]?.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}

                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                  + Add Lead
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserGroupIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lead.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.source}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.assignedTo}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(lead.lastContact).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-800 mr-3">
                        Edit
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
LeadsManagement.propTypes = {
  leads: PropTypes.array,
};
export default LeadsManagement;

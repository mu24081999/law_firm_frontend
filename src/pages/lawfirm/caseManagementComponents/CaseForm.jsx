import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CaseForm = ({ onSubmit, selectedCase }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    case_number: "",
    client_name: "",
    opponent_name: "",
    court_name: "",
    case_type: "Civil",
    status: "open",
    filing_date: "",
    hearing_date: "",
    next_action: "",
    assigned_to: "",
    notes: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  useEffect(() => {
    if (selectedCase?.id) {
      setFormData(selectedCase);
    }
    return () => {};
  }, [selectedCase]);
  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="family-law">Family Law</option>
            <option value="corporate">Corporate</option>
            <option value="criminal">Criminal</option>
            <option value="property">Property</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Case Number
          </label>
          <input
            name="case_number"
            value={formData.case_number}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Client Name
          </label>
          <input
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Opponent Name
          </label>
          <input
            name="opponent_name"
            value={formData.opponent_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Court Name
          </label>
          <input
            name="court_name"
            value={formData.court_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Case Type
          </label>
          <select
            name="case_type"
            value={formData.case_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Civil">Family Law</option>
            <option value="Civil">Corporate</option>
            <option value="Civil">Civil</option>
            <option value="Criminal">Criminal</option>
            <option value="Arbitration">Property</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Case Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Filing Date
          </label>
          <input
            type="date"
            name="filing_date"
            value={formData.filing_date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Hearing Date
          </label>
          <input
            type="date"
            name="hearing_date"
            value={formData.hearing_date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Next Action
          </label>
          <input
            name="next_action"
            value={formData.next_action}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Assigned To
          </label>
          <input
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Submit Case
          </button>
        </div>
      </form>
    </div>
  );
};
CaseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default CaseForm;

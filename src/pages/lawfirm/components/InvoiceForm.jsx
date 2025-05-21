import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../../redux/services/billingInvoice";
import { getClientsApi } from "../../../redux/services/firm";
const InvoiceForm = ({ onSubmit, clients }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [selectedClient, setSelectedClient] = useState();
  const [formData, setFormData] = useState({
    userId: user?.id,
    invoiceNo: "",
    clientName: "",
    case: "",
    dueDate: new Date().toISOString().slice(0, 10), // today's date
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!formData.invoiceNo?.trim())
      errs.invoiceNo = "Invoice number is required";

    if (!formData.clientName?.trim())
      errs.clientName = "Client name is required";

    if (!formData.case?.trim()) errs.case = "Case is required";

    if (!formData.dueDate) errs.dueDate = "Due date is required";

    if (!formData.amount) errs.amount = "Amount is required";
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      errs.amount = "Amount must be a positive number";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) onSubmit(formData);
    // alert("Invoice created!");

    setFormData({
      invoiceNo: "",
      clientName: "",
      case: "",
      dueDate: new Date().toISOString().slice(0, 10), // today's date
      amount: "",
      description: "",
    });
    setErrors({});
  };
  const handleSelectClient = (client) => {
    console.log("🚀 ~ handleSelectClient ~ client:", client);
    setSelectedClient(client);
    setFormData({
      ...formData,
      clientId: client?.id,
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4 mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Monthly Invoice
      </h2>
      <label className="block">
        <span className="text-gray-700">Client</span>
        <select
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.client ? "border-red-500" : "border-gray-300"
          }`}
          name="client"
          value={formData.clientId} // Assuming you're tracking the selected client
          onChange={(e) => {
            const selectedClientId = e.target.value;
            const selectedClient = clients.find(
              (c) => c.id === selectedClientId
            );
            handleSelectClient(selectedClient);
          }}
        >
          <option value="">Select a client</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstname + " " + client.lastname}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Invoice Number</span>
        <input
          type="text"
          name="invoiceNo"
          value={formData.invoiceNo}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.invoiceNo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.invoiceNo && (
          <p className="text-red-600 text-sm mt-1">{errors.invoiceNo}</p>
        )}
      </label>

      <label className="block">
        <span className="text-gray-700">Client Name</span>
        <input
          type="text"
          name="clientName"
          value={selectedClient?.firstname + " " + selectedClient?.lastname}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.clientName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.clientName && (
          <p className="text-red-600 text-sm mt-1">{errors.clientName}</p>
        )}
      </label>

      <label className="block">
        <span className="text-gray-700">Case</span>
        <input
          type="text"
          name="case"
          value={formData.case}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.case ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.case && (
          <p className="text-red-600 text-sm mt-1">{errors.case}</p>
        )}
      </label>

      <label className="block">
        <span className="text-gray-700">Due Date</span>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.dueDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dueDate && (
          <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
        )}
      </label>

      <label className="block">
        <span className="text-gray-700">Amount (USD)</span>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.amount && (
          <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
        )}
      </label>

      <label className="block">
        <span className="text-gray-700">Description (optional)</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      {/* Optional: Status dropdown if you want to allow selecting status manually */}
      <label className="block">
        <span className="text-gray-700">Status</span>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Create Invoice
      </button>
    </form>
  );
};

export default function InvoiceCreator() {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.firm);

  const [showForm, setShowForm] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const onSubmit = async (formData) => {
    const done = await dispatch(createInvoice(token, formData));
    if (done?.success) setShowForm(false);
  };
  useEffect(() => {
    dispatch(getClientsApi(token, user?.id));

    return () => {};
  }, [dispatch, token, user]);
  return (
    <div className=" relative">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 max-w-sm float-end text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Create Invoice
        </button>
      )}
      {showForm && (
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-5 right-5"
        >
          <RxCrossCircled size={20} />
        </button>
      )}
      <div
        className={` w-full  transition-all duration-500 ease-in-out ${
          showForm
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {showForm && <InvoiceForm onSubmit={onSubmit} clients={clients} />}
      </div>
    </div>
  );
}
InvoiceForm.propTypes = {
  onSubmit: PropTypes.func,
  clients: PropTypes.array,
};

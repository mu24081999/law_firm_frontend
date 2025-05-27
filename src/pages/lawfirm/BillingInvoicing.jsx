import { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import StatusBadge from "../components/common/StatusBadge";
import {
  PlusIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import CreditCardManager from "./components/CreditCardManager";
import InvoiceCreator from "./components/InvoiceForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInvoicesApi,
  sendInvoiceEmail,
} from "../../redux/services/billingInvoice";
import { getClientsApi } from "../../redux/services/firm";
function BillingInvoicing() {
  const { token, user } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.billing);
  const { clients } = useSelector((state) => state.firm);

  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("invoices");

  // const invoices = [
  //   {
  //     id: "INV-1001",
  //     client: "Johnson & Sons",
  //     case: "Corporate Restructuring",
  //     amount: 2450.0,
  //     status: "Paid",
  //     date: "2023-10-10",
  //     dueDate: "2023-10-25",
  //     paymentMethod: "Bank Transfer",
  //     paymentDate: "2023-10-15",
  //   },
  //   {
  //     id: "INV-1002",
  //     client: "Maria Rodriguez",
  //     case: "Divorce Settlement",
  //     amount: 1800.0,
  //     status: "Pending",
  //     date: "2023-10-12",
  //     dueDate: "2023-10-27",
  //     paymentMethod: "Pending",
  //     paymentDate: null,
  //   },
  //   {
  //     id: "INV-1003",
  //     client: "Wilson Enterprises",
  //     case: "Contract Review",
  //     amount: 975.0,
  //     status: "Overdue",
  //     date: "2023-09-28",
  //     dueDate: "2023-10-13",
  //     paymentMethod: "Pending",
  //     paymentDate: null,
  //   },
  //   {
  //     id: "INV-1004",
  //     client: "Robert Smith",
  //     case: "Estate Planning",
  //     amount: 3200.0,
  //     status: "Paid",
  //     date: "2023-10-05",
  //     dueDate: "2023-10-20",
  //     paymentMethod: "Bank Transfer",
  //     paymentDate: "2023-10-18",
  //   },
  //   {
  //     id: "INV-1005",
  //     client: "Tech Solutions Inc.",
  //     case: "Patent Application",
  //     amount: 4250.0,
  //     status: "Pending",
  //     date: "2023-10-15",
  //     dueDate: "2023-10-30",
  //     paymentMethod: "Pending",
  //     paymentDate: null,
  //   },
  // ];

  const filterInvoicesByStatus = (status) => {
    if (status === "all") return invoices;
    return invoices.filter(
      (invoice) => invoice.status.toLowerCase() === status.toLowerCase()
    );
  };

  const getTotalAmount = (status) => {
    return filterInvoicesByStatus(status)
      .reduce((sum, invoice) => sum + invoice.amount, 0)
      .toLocaleString("en-US", { style: "currency", currency: "USD" });
  };
  const handleSendInvoice = (invoice) => {
    const dueDate = new Date(invoice?.dueDate);
    // Get month and year
    const billingMonth = dueDate.toLocaleString("default", { month: "long" }); // e.g., "May"
    const billingYear = dueDate.getFullYear(); // 2025
    const params = {
      userId: user?.id,
      clientId: invoice?.clientId,
      invoiceNumber: invoice?.invoiceNo,
      invoiceDate: invoice?.createdAt,
      billingMonth: billingMonth,
      billingYear: billingYear,
      amount: invoice?.amount,
      description: invoice?.description,
    };
    dispatch(sendInvoiceEmail(token, params));
  };
  const creditCardPaymentInstructions = `
  Please use your credit card to complete the payment securely.
  
  Accepted Cards: Visa, MasterCard, American Express, Discover
  
  When entering your card details, please ensure:
  - Cardholder Name matches your card
  - Card Number is entered correctly
  - Expiry date (MM/YY) is valid and current
  - CVC code is the 3 or 4 digit security number on the back/front of your card
  
  For your reference, please include your invoice number (e.g., INV-1002) in the payment notes or reference field.
  
  If you face any issues processing the payment, please contact our support team.
  `;
  useEffect(() => {
    const query = `userId=${user?.id}`;
    dispatch(getUserInvoicesApi(token, query));

    return () => {};
  }, [user, token, dispatch]);
  return (
    <div className="p-4">
      <PageHeader
        title="Billing & Invoicing"
        subtitle="Manage invoices, track payments, and monitor your finances"
        actions={<InvoiceCreator />}
      />
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <h3 className="text-lg font-semibold">Total Outstanding</h3>
          <p className="text-3xl font-bold mt-2">{getTotalAmount("pending")}</p>
          <p className="mt-1 text-blue-100">
            {filterInvoicesByStatus("pending").length} pending invoices
          </p>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
          <h3 className="text-lg font-semibold">Total Received</h3>
          <p className="text-3xl font-bold mt-2">{getTotalAmount("paid")}</p>
          <p className="mt-1 text-green-100">
            {filterInvoicesByStatus("paid").length} paid invoices
          </p>
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
          <h3 className="text-lg font-semibold">Overdue</h3>
          <p className="text-3xl font-bold mt-2">{getTotalAmount("overdue")}</p>
          <p className="mt-1 text-red-100">
            {filterInvoicesByStatus("overdue").length} overdue invoices
          </p>
        </Card>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6">
          {["invoices", "payments", "instructions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-2 text-sm font-medium border-b-2 transition ${
                selectedTab === tab
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:border-gray-300"
              }`}
            >
              {tab === "invoices"
                ? "Invoices"
                : tab === "payments"
                ? "Payment Methods"
                : "Payment Instructions"}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      {selectedTab === "invoices" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-wrap gap-2">
              {["All Invoices", "Pending", "Paid", "Overdue"].map((label) => (
                <button
                  key={label}
                  className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                >
                  {label}
                </button>
              ))}
            </div>
            <select className="form-select text-sm py-1 px-2 border rounded border-gray-300">
              <option>Last 30 days</option>
              <option>Last 60 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>

          <Card className="p-0 overflow-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Invoice #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Client & Case
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices?.map((invoice) => (
                  <tr key={invoice?.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-primary-600">
                      INV-{invoice?.id?.slice(0, 4)}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-gray-900 font-medium">
                        {invoice?.clientName}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {invoice?.case}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div>
                        {new Date(invoice?.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Due: {new Date(invoice?.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                      ${invoice?.amount}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <StatusBadge status={invoice?.status} />
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button className="text-primary-600 hover:text-primary-800">
                        <ArrowDownTrayIcon className="w-5 h-5 inline" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => handleSendInvoice(invoice)}
                      >
                        <EnvelopeIcon className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      {selectedTab === "payments" && (
        <Card>
          <div>
            <CreditCardManager />
          </div>
        </Card>
      )}

      {selectedTab === "instructions" && (
        <Card>
          <h3 className="text-lg font-semibold mb-2">
            Card Information Putting Instructions
          </h3>
          <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 whitespace-pre-wrap">
            {creditCardPaymentInstructions}
          </pre>
        </Card>
      )}
    </div>
  );
}

export default BillingInvoicing;

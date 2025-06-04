import { format } from "date-fns";
import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import moment from "moment";
const Invoice = ({ invoiceData }) => {
  const invoiceRef = useRef();

  const downloadPDF = () => {
    const element = invoiceRef.current;
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Invoice-${invoiceData.invoiceNumber}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="p-4">
      <div
        ref={invoiceRef}
        className="bg-white max-w-3xl mx-auto p-8 shadow-md border border-gray-200 rounded-md text-gray-800 font-sans"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">INVOICE</h1>
            <p className="text-sm text-gray-500">
              Invoice #: {invoiceData?.invoiceNo}
            </p>
            <p className="text-sm text-gray-500">
              Date:{" "}
              {moment(new Date(invoiceData?.dueDate)).format("MMM DD yyyy")}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">{invoiceData?.company}</h2>
            <p className="text-sm">Thank you for your business</p>
          </div>
        </div>

        {/* Client Section */}
        <div className="mb-6">
          <p className="text-md font-medium">Bill To:</p>
          <p className="text-lg">{invoiceData.clientName}</p>
        </div>

        {/* Details Table */}
        <table className="w-full text-sm table-auto mb-6 border border-gray-200">
          <tbody>
            <tr className="bg-gray-50">
              <td className="border px-4 py-2 font-semibold">Invoice Number</td>
              <td className="border px-4 py-2">{invoiceData.invoiceNo}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Invoice Date</td>
              <td className="border px-4 py-2">
                {moment(new Date(invoiceData?.dueDate)).format("MMM DD yyyy")}{" "}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border px-4 py-2 font-semibold">Billing Month</td>
              <td className="border px-4 py-2">
                {moment(new Date(invoiceData?.dueDate)).format("MMM")}{" "}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Description</td>
              <td className="border px-4 py-2">
                {invoiceData.description || "N/A"}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border px-4 py-2 font-semibold">Amount Due</td>
              <td className="border px-4 py-2 text-red-600 font-bold">
                ${Number(invoiceData.amount).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Bank Info */}
        {invoiceData?.user?.bankAccount && (
          <div className="mt-8">
            <h3 className="text-md font-semibold mb-2">
              Bank Details for Payment
            </h3>
            <div className="text-sm leading-relaxed space-y-1">
              <p>
                <strong>Bank Name:</strong>{" "}
                {invoiceData.user.bankAccount.bank_name}
              </p>
              <p>
                <strong>Account Name:</strong>{" "}
                {invoiceData.user.bankAccount.account_title}
              </p>
              <p>
                <strong>Account Number:</strong>{" "}
                {invoiceData.user.bankAccount.account_number}
              </p>
              <p>
                <strong>IBAN:</strong> {invoiceData.user.bankAccount.iban}
              </p>
              <p>
                <strong>SWIFT Code:</strong>{" "}
                {invoiceData.user.bankAccount.swift_code}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10">
          <p className="mb-4">
            Please make the payment at your earliest convenience. If you have
            any questions regarding this invoice, contact us.
          </p>
          <p>
            Best regards, <br />
            <strong>{invoiceData.company}</strong>
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition duration-300"
          onClick={downloadPDF}
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;

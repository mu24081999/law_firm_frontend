import { useState } from 'react';
import { useForm } from 'react-hook-form';

const serviceRequirements = {
  "Personal Tax Filing": [
    { name: "cnic", label: "CNIC Number", type: "text", required: true },
    { name: "income", label: "Annual Income", type: "number", required: true },
    { name: "employerNTN", label: "Employer NTN (if applicable)", type: "text" },
    { name: "taxYear", label: "Tax Year", type: "select", options: ["2024", "2023", "2022"], required: true },
    { name: "salarySlips", label: "Upload Salary Slips", type: "file", required: true },
    { name: "bankStatements", label: "Upload Bank Statements", type: "file", required: true }
  ],
  "Family Tax Filing": [
    { name: "primaryCNIC", label: "Primary Member CNIC", type: "text", required: true },
    { name: "familyMembers", label: "Number of Family Members", type: "number", required: true },
    { name: "memberDetails", label: "Family Members CNICs (comma separated)", type: "text", required: true },
    { name: "totalIncome", label: "Total Family Income", type: "number", required: true },
    { name: "taxYear", label: "Tax Year", type: "select", options: ["2024", "2023", "2022"], required: true },
    { name: "documents", label: "Upload Family Documents", type: "file", required: true }
  ],
  "NTN Registration": [
    { name: "cnic", label: "CNIC Number", type: "text", required: true },
    { name: "fullName", label: "Full Name (as per CNIC)", type: "text", required: true },
    { name: "fatherName", label: "Father's Name", type: "text", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "address", label: "Current Address", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "cnicFront", label: "Upload CNIC Front", type: "file", required: true },
    { name: "cnicBack", label: "Upload CNIC Back", type: "file", required: true }
  ],
  "NTN Finder": [
    { name: "cnic", label: "CNIC Number", type: "text", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true }
  ],
  "ATL Status Check": [
    { name: "ntnNumber", label: "NTN Number", type: "text", required: true },
    { name: "cnic", label: "CNIC Number", type: "text", required: true },
    { name: "taxYear", label: "Tax Year", type: "select", options: ["2024", "2023", "2022"], required: true }
  ],
  "IRIS Profile Update": [
    { name: "ntnNumber", label: "NTN Number", type: "text", required: true },
    { name: "cnic", label: "CNIC Number", type: "text", required: true },
    { name: "newEmail", label: "New Email Address", type: "email", required: true },
    { name: "newPhone", label: "New Phone Number", type: "tel", required: true },
    { name: "newAddress", label: "New Address", type: "text", required: true },
    { name: "proofDocument", label: "Upload Address Proof", type: "file", required: true }
  ],
  "Business Incorporation": [
    { name: "businessName", label: "Proposed Business Name", type: "text", required: true },
    { name: "businessType", label: "Business Type", type: "select", options: ["Sole Proprietorship", "Partnership", "Private Limited"], required: true },
    { name: "ownerCNIC", label: "Owner CNIC", type: "text", required: true },
    { name: "businessAddress", label: "Business Address", type: "text", required: true },
    { name: "natureOfBusiness", label: "Nature of Business", type: "text", required: true },
    { name: "initialCapital", label: "Initial Capital", type: "number", required: true },
    { name: "cnicCopy", label: "Upload CNIC Copy", type: "file", required: true },
    { name: "utilityBill", label: "Upload Utility Bill", type: "file", required: true },
    { name: "rentAgreement", label: "Upload Rent Agreement/Ownership Proof", type: "file", required: true }
  ],
  "GST Registration": [
    { name: "businessNTN", label: "Business NTN", type: "text", required: true },
    { name: "businessName", label: "Registered Business Name", type: "text", required: true },
    { name: "businessAddress", label: "Business Address", type: "text", required: true },
    { name: "bankAccount", label: "Business Bank Account Details", type: "text", required: true },
    { name: "monthlyTurnover", label: "Expected Monthly Turnover", type: "number", required: true },
    { name: "businessNature", label: "Nature of Business", type: "select", options: ["Manufacturing", "Services", "Trading", "Other"], required: true },
    { name: "bankStatement", label: "Upload Bank Statement", type: "file", required: true },
    { name: "utilityBill", label: "Upload Utility Bill", type: "file", required: true }
  ],
  "IP Registration": [
    { name: "ipType", label: "IP Type", type: "select", options: ["Trademark", "Patent", "Copyright"], required: true },
    { name: "ownerName", label: "Owner Name", type: "text", required: true },
    { name: "ownerCNIC", label: "Owner CNIC", type: "text", required: true },
    { name: "ipDescription", label: "IP Description", type: "textarea", required: true },
    { name: "ipDocuments", label: "Upload IP Documents", type: "file", required: true },
    { name: "proofOfOwnership", label: "Upload Proof of Ownership", type: "file", required: true }
  ],
  "USA LLC Formation": [
    { name: "companyName", label: "Proposed Company Name", type: "text", required: true },
    { name: "state", label: "State of Formation", type: "select", options: ["Delaware", "Wyoming", "Florida"], required: true },
    { name: "ownerName", label: "Owner Name", type: "text", required: true },
    { name: "ownerCNIC", label: "Owner CNIC", type: "text", required: true },
    { name: "passportCopy", label: "Upload Passport Copy", type: "file", required: true },
    { name: "businessPlan", label: "Upload Business Plan", type: "file", required: true },
    { name: "proofOfAddress", label: "Upload Proof of Address", type: "file", required: true },
    { name: "bankReference", label: "Upload Bank Reference Letter", type: "file", required: true }
  ]
};

function ServiceRequestForm({ service, onClose }) {
  const [step, setStep] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [receiptFile, setReceiptFile] = useState(null);

  const onSubmit = (data) => {
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      if (paymentMethod === 'bank') {
        setStep('receipt');
      } else {
        // Handle card payment
        console.log('Processing card payment...');
      }
    } else if (step === 'receipt') {
      // Generate order ID and submit
      const orderId = 'ORD-' + Date.now();
      const finalData = {
        ...data,
        orderId,
        service: service.title,
        paymentMethod,
        receipt: receiptFile,
        status: 'pending'
      };
      console.log('Submitting order:', finalData);
      onClose();
    }
  };

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{service.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 'details' && (
            <div className="space-y-4">
              {serviceRequirements[service.title]?.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      {...register(field.name, { required: field.required })}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      {...register(field.name, { required: field.required })}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      rows={4}
                    />
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      {...register(field.name, { required: field.required })}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      accept={field.type === 'file' ? 'image/*,.pdf' : undefined}
                    />
                  ) : (
                    <input
                      type={field.type}
                      {...register(field.name, { required: field.required })}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">This field is required</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg ${
                    paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                  }`}
                >
                  Credit/Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 border rounded-lg ${
                    paymentMethod === 'bank' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                  }`}
                >
                  Bank Transfer
                </button>
              </div>
            </div>
          )}

          {step === 'receipt' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upload Bank Transfer Receipt</h3>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            {step !== 'details' && (
              <button
                type="button"
                onClick={() => setStep(step === 'receipt' ? 'payment' : 'details')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {step === 'receipt' ? 'Submit' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceRequestForm;
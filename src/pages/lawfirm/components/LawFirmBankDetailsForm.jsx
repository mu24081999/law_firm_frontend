import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const LawFirmBankDetailsForm = ({ initialData = {}, onSubmit }) => {
  const { user } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.bankAccount);

  const [form, setForm] = useState({
    userId: user?.id,
    accountHolder: initialData.accountHolder || "",
    accountNumber: initialData.accountNumber || "",
    iban: initialData.iban || "",
    swiftCode: initialData.swiftCode || "",
    bankName: initialData.bankName || "",
    branchAddress: initialData.branchAddress || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userId: user?.id,
      account_title: form.accountHolder || "",
      account_number: form.accountNumber || "",
      iban: form.iban || "",
      swift_code: form.swiftCode || "",
      bank_name: form.bankName || "",
      branch_code: form.branchAddress || "",
    };
    if (onSubmit) onSubmit(formData);
  };
  useEffect(() => {
    if (account?.id) {
      const params = {
        userId: account?.userId,
        accountHolder: account.account_title || "",
        accountNumber: account.account_number || "",
        iban: account.iban || "",
        swiftCode: account.swift_code || "",
        bankName: account.bank_name || "",
        branchAddress: account.branch_code || "",
      };
      setForm(params);
    }
  }, [account]);
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">
        Law Firm Bank Account Details
      </h2>

      <div className="mb-4">
        <label className="block mb-1">Account Holder Name</label>
        <input
          type="text"
          name="accountHolder"
          value={form.accountHolder}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Account Number</label>
        <input
          type="text"
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">IBAN</label>
        <input
          type="text"
          name="iban"
          value={form.iban}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">SWIFT Code</label>
        <input
          type="text"
          name="swiftCode"
          value={form.swiftCode}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Bank Name</label>
        <input
          type="text"
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Branch Address</label>
        <input
          type="text"
          name="branchAddress"
          value={form.branchAddress}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Details
      </button>
    </form>
  );
};
LawFirmBankDetailsForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default LawFirmBankDetailsForm;

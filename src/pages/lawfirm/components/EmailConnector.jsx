import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUpdateAccount,
  getEmailAccountByUserId,
} from "../../../redux/services/emailAccount";

const EmailConnector = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.emailAccount);
  const [type, setType] = useState("gmail");
  const [form, setForm] = useState({
    userId: user?.id,
    name: "",
    email: "",
    password: "",
    smtpHost: "smpt.gmail.com",
  });

  const handleConnect = async () => {
    console.log("click");
    const formData = {
      ...form,
      type,
    };
    const result = await dispatch(addUpdateAccount(token, formData));
  };
  useEffect(() => {
    dispatch(getEmailAccountByUserId(token, user?.id));
    return () => {};
  }, [user, token, dispatch]);
  useEffect(() => {
    if (account?.id) {
      setForm({
        userId: account?.userId,
        name: account?.name,
        email: account?.email,
        password: account?.password,
        smtpHost: account?.mail_provider,
        type: account?.type,
      });
    }
    return () => {};
  }, [account]);

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-bold"> Email Account</h2>

      <div>
        <label className="block font-medium mb-1">Select Email Type</label>
        <select
          className="border p-2 w-full mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="gmail">Gmail</option>
          <option value="professional">Professional Email</option>
        </select>
      </div>

      <div>
        <input
          className="border p-2 w-full mb-2"
          type="email"
          required
          placeholder="Your Account Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          type="email"
          required
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {type === "professional" && (
          <>
            <input
              className="border p-2 w-full mb-2"
              type="text"
              required
              placeholder="SMTP Host (e.g., smtp.domain.com)"
              value={form.smtpHost}
              onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
            />
          </>
        )}

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={handleConnect}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default EmailConnector;

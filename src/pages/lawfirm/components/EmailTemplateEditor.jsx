import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addUpdateTemplate,
  getEmailTemplateByUserId,
} from "../../../redux/services/emailTemplate";

const EmailTemplateEditor = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { template } = useSelector((state) => state.emailTemplate);
  const [activeTab, setActiveTab] = useState("forgot");
  const [templates, setTemplates] = useState({
    forgot:
      '<p>Hi [User], click <a href="#">here</a> to reset your password.</p>',
    login:
      "<p>Hi [User], you just logged in. If this wasn’t you, contact support.</p>",
    registration: "<p>Welcome [User], thanks for registering!</p>",
  });

  const handleChange = (content) => {
    setTemplates({ ...templates, [activeTab]: content });
  };

  const handleSave = () => {
    // Example: Send to API
    const formData = {
      userId: user?.id,
      forgotEmail: templates?.forgot,
      loginEmail: templates?.login,
      registrationEmail: templates?.registration,
    };
    dispatch(addUpdateTemplate(token, formData));
  };
  useEffect(() => {
    dispatch(getEmailTemplateByUserId(token, user?.id));
    return () => {};
  }, [user, token, dispatch]);
  useEffect(() => {
    if (template?.id) {
      setTemplates({
        userId: template?.userId,
        forgot: template?.forgotEmail,
        login: template?.loginEmail,
        registration: template?.registrationEmail,
      });
    }
    return () => {};
  }, [template]);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Email Template</h2>

      <div className="flex gap-4 mb-4">
        {["forgot", "login", "registration"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded ${
              activeTab === type ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Email
          </button>
        ))}
      </div>

      <ReactQuill
        value={templates[activeTab]}
        onChange={handleChange}
        theme="snow"
        className="mb-4"
      />

      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handleSave}
      >
        Save All Templates
      </button>
    </div>
  );
};

export default EmailTemplateEditor;

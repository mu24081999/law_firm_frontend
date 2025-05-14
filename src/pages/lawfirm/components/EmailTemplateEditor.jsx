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
    forgot: `<div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    <h2 style="color: #4a90e2;">🔐 Password Reset Request</h2>
    <p>Hi {{first_name}},</p>

    <p>We received a request to reset your password for your <strong>{{your_app_name}}</strong> account.</p>

    <p>Please use the following One-Time Password (OTP) to reset your password:</p>

    <p style="font-size: 24px; font-weight: bold; color: #4a90e2; margin: 20px 0;">{{otp_code}}</p>

    <p>This code is valid for the next 24 hours. Please do not share this code with anyone.</p>

    <p>If you didn't request this, you can safely ignore this email.</p>

    <p>Thanks,<br />
    The {{your_app_name}} Team</p>
  </div>
</div>`,
    login: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
    <h2 style="color: #2d89ef;">🔓 Login Successful</h2>
    <p>Hi {{first_name}},</p>

    <p>We noticed a successful login to your account:</p>

    <ul>
      <li><strong>Date:</strong> {{login_date}}</li>
      <li><strong>Time:</strong> {{login_time}}</li>
      <li><strong>IP Address:</strong> {{ip_address}}</li>
      <li><strong>Location:</strong> {{location}}</li>
    </ul>

    <p>If this was you, no further action is needed.</p>
    <p>If you didn’t perform this login, please <a href="{{reset_password_url}}">reset your password</a> immediately or contact support.</p>

    <p>Stay secure,<br />
    The {{your_app_name}} Team</p>
  </div>
</div>`,
    registration: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
    <h2 style="color: #2d89ef;">🎉 Welcome Aboard, {{first_name}}!</h2>
    <p>We're excited to have you on board at <strong>{{your_app_name}}</strong>.</p>

    <p>✅ Your registration is complete<br />
    ✅ Your subscription is active</p>

    <p>You now have full access to all features of our platform.</p>

    <p style="margin-top: 20px;">
      <a href="{{login_url}}" style="display: inline-block; background-color: #2d89ef; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
        Log In Now
      </a>
    </p>

    <p>If you have any questions, simply reply to this email — we’re here to help!</p>

    <p>Cheers,<br />
    The {{your_app_name}} Team</p>
  </div>
</div>`,
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

import React, { useCallback, useEffect } from "react";
import TemplateUploadForm from "./components/TemplateUploadForm";
import TemplateList from "./components/TemplateList";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;
const Index = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [templates, setTemplates] = React.useState([]);
  const handleSetTemplates = (newTemplates) => {
    setTemplates(newTemplates);
  };
  const getTemplates = useCallback(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-acess-token": token,
        },
      };
      const response = await axios.get(
        `${backendURL}/default-templates`,
        config
      );
      setTemplates(response.data.data.templates || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error(error.message);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      getTemplates();
    }
  }, [getTemplates, user]);
  return (
    <div>
      <TemplateUploadForm onSetTemplates={handleSetTemplates} />
      <TemplateList templates={templates} onSetTemplates={handleSetTemplates} />
    </div>
  );
};

export default Index;

import { useState, useRef, useEffect } from "react";
import useSocket from "../context/SocketContext/useSocket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Button from "./Button";
import FilePreviewFromCloudinary from "./FilePreview";

function ChatSection() {
  const { firmId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { clientsArray, getMessages, messagesArray, sendMessage, getRooms } =
    useSocket();
  const { token, user } = useSelector((state) => state.auth);

  const [selectedClient, setSelectedClient] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && selectedFiles.length === 0) return;

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({
            name: file.name,
            type: file.type,
            base64: reader.result,
          });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      const filesBase64 = await Promise.all(
        selectedFiles.map((file) => convertToBase64(file))
      );

      const messageData = {
        senderId: user?.id,
        recieverId: selectedClient?.id,
        message: newMessage.trim(),
        files: filesBase64, // contains name, type, base64 string
      };

      sendMessage(messageData);
      setNewMessage("");
      setSelectedFiles([]);
    } catch (err) {
      console.error("File conversion error:", err);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleSelected = (client) => {
    setSelectedClient(client);
    getMessages(user?.id, client?.id);
  };

  useEffect(() => {
    let userType = firmId ? "client" : "firm";
    const userId = firmId ? firmId : user?.id;
    const me = user?.id;
    getRooms(userType, userId, me);
  }, [user, firmId]);
  const getFilteredRooms = () => {
    if (!Array.isArray(clientsArray)) return [];
    if (searchTerm.trim() === "") return clientsArray;

    return clientsArray.filter((client) =>
      (client?.firstname + " " + client?.lastname)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-[87vh] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          selectedClient ? "sm:hidden md:block" : "block"
        } w-full md:w-1/3 bg-white border-r border-gray-300 h-[87vh]`}
      >
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-xl md:text-2xl font-semibold">Client Chat</h1>
        </header>
        {/* Search Bar */}
        <div className="p-3">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="overflow-y-scroll p-3">
          {/* {Array.isArray(clientsArray) &&
            clientsArray.map((client, index) => ( */}
          {getFilteredRooms()?.map((client, index) => (
            <div
              key={index}
              onClick={() => handleSelected(client)}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={
                    client?.avatar ||
                    "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-md md:text-lg font-semibold">
                  {client?.firstname + " " + client?.lastname}
                </h2>
                <p className="text-gray-600 text-sm">Click to chat</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`${
          selectedClient ? "block" : "hidden md:block"
        } w-full md:w-2/3 flex flex-col h-[87vh] relative`}
      >
        {selectedClient ? (
          <>
            <header className="bg-white p-4 border-b border-gray-300 flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                {selectedClient?.firstname + " " + selectedClient?.lastname}
              </h1>
              <button
                onClick={() => setSelectedClient(null)}
                className="md:hidden text-indigo-500 underline"
              >
                ← Back
              </button>
            </header>

            {/* Messages */}
            <div className="flex-1 sm:max-h-[60vh] lg:max-h-[75vh] overflow-scroll p-4">
              {messagesArray?.map((message, index) => {
                const fileUrls =
                  typeof message?.fileUrls === "string"
                    ? JSON.parse(message?.fileUrls)
                    : message?.fileUrls;
                return (
                  <div key={index} ref={messagesEndRef}>
                    {message?.senderId === user?.id ? (
                      <div className="flex justify-end mb-4">
                        <div>
                          {" "}
                          {Array.isArray(fileUrls) && fileUrls?.length > 0 && (
                            <FilePreviewFromCloudinary files={fileUrls} />
                          )}
                          <div className="max-w-[80%] bg-indigo-500 text-white rounded-lg p-3">
                            <p className="text-sm md:text-base">
                              {message?.message}
                            </p>

                            <p className="text-xs text-white mt-1 text-right">
                              {format(message?.createdAt, "dd MMM HH:mm a")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start mb-4">
                        <div className="max-w-[80%] bg-white text-gray-800 rounded-lg p-3">
                          <p className="text-sm md:text-base">
                            {message?.message}
                          </p>
                          {Array.isArray(fileUrls) && fileUrls?.length > 0 && (
                            <FilePreviewFromCloudinary files={fileUrls} />
                          )}{" "}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-right">
                          {format(message?.createdAt, "dd MMM HH:mm a")}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <footer className="bg-white border-t border-gray-300 p-4 w-full absolute bottom-0">
              <div className="flex flex-col gap-2">
                {/* File Preview */}
                {selectedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 p-2 rounded shadow text-sm text-gray-700"
                      >
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-2 ">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                  />

                  {/* File Input */}
                  <label className="cursor-pointer bg-gray-100 text-gray-700 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-200">
                    📎
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>

                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500 text-center">
              Select a client to start chatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSection;

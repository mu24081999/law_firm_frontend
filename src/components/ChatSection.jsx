import { useState, useRef, useEffect } from "react";
import useSocket from "../context/SocketContext/useSocket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Button from "./Button";
function ChatSection() {
  const { firmId } = useParams();
  const { clientsArray, getMessages, messagesArray, sendMessage, getRooms } =
    useSocket();
  const [selectedClient, setSelectedClient] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messagesArray]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && selectedFiles.length === 0) return;

    const newMsg = {
      senderId: user?.id,
      recieverId: selectedClient?.id,
      message: newMessage.trim(),
    };
    sendMessage(newMsg);
    setMessages([...messages, newMsg]);
    setNewMessage("");
    setSelectedFiles([]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
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

  return (
    <div className="flex flex-col md:flex-row h-[87vh] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          selectedClient ? "sm:hidden md:block" : "block"
        } w-full md:w-1/3 bg-white border-r border-gray-300`}
      >
        {/* Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-xl md:text-2xl font-semibold">Client Chat</h1>
        </header>

        {/* Contact List */}
        <div className="overflow-y-scroll h-[75vh] p-3">
          {Array.isArray(clientsArray) &&
            clientsArray?.map((client, index) => (
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
        } w-full md:w-2/3 flex flex-col`}
      >
        {selectedClient && (
          <>
            {/* Chat Header */}
            <header className="bg-white p-4 border-b border-gray-300 flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                {selectedClient?.firstname + " " + selectedClient?.lastname}
              </h1>
              {/* Mobile back button */}
              <button
                onClick={() => setSelectedClient(null)}
                className="md:hidden text-indigo-500 underline"
              >
                ← Back
              </button>
            </header>

            {/* Messages */}
            <div className="flex-1 sm:max-h-[60vh] lg:max-h-[75vh] overflow-scroll p-4">
              {messagesArray?.map((message, index) => (
                <div key={index} ref={messagesEndRef}>
                  {message?.senderId === user?.id ? (
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[80%] bg-indigo-500 text-white rounded-lg p-3">
                        <p className="text-sm md:text-base">
                          {message?.message}
                        </p>
                        <p className="text-xs text-white mt-1 text-right">
                          {format(message?.createdAt, "dd MMM HH:mm a")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[80%] bg-white text-gray-800 rounded-lg p-3">
                        <p className="text-sm md:text-base">
                          {message?.message}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 text-right">
                          {format(message?.createdAt, "dd MMM HH:mm a")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <footer className="p-4 border-t border-gray-300 bg-white">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none text-sm md:text-base"
                />
                <Button
                  onClick={handleSendMessage}
                  // className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm md:text-base"
                >
                  Send
                </Button>
              </div>
            </footer>
          </>
        )}
        {!selectedClient && (
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

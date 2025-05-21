import { useState, useRef, useEffect } from "react";
import useSocket from "../../context/SocketContext/useSocket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import FilePreviewFromCloudinary from "../../components/FilePreview";

function TeamChat() {
  const { firmId } = useParams();
  const {
    teamChatRooms,
    teamMessagesArray,
    sendTeamMessage,
    getTeamChatRooms,
    getTeamMessages,
  } = useSocket();

  const [selectedClient, setSelectedClient] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [teamMessagesArray]);

  useEffect(() => {
    if (user) {
      const ownerId = user?.member?.ownerId || user?.id;
      const userType = user?.member?.ownerId ? "team" : "firm";
      const me = user?.member ? user?.member?.id : user?.id;
      getTeamChatRooms(ownerId, me, userType);
    }
  }, [user]);

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
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && selectedFiles.length === 0) return;
    const filesBase64 = await Promise.all(
      selectedFiles.map((file) => convertToBase64(file))
    );
    const msg = {
      senderId: user?.member ? user.member.id : user?.id,
      receiverId: selectedClient?.id,
      message: newMessage.trim(),
      recieverType: selectedClient?.ownerId ? "team" : "firm",
      senderType: user?.member?.ownerId ? "team" : "firm",
      files: filesBase64, // Backend must handle this
    };
    sendTeamMessage(msg);
    setNewMessage("");
    setSelectedFiles([]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSelected = (client) => {
    setSelectedClient(client);
    const senderId = user?.member ? user.member.id : user?.id;
    const senderType = user?.member ? "team" : "firm";
    getTeamMessages(senderId, senderType);
  };

  const filteredRooms = teamChatRooms?.filter((client) =>
    (client.firstname + " " + client.lastname)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 max-h-[87vh] overflow-hidden">
      {/* Sidebar */}
      <div className="col-span-1 h-[87vh] bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Team Chat</h1>
        </header>

        {/* Search Bar */}
        <div className="px-4 pt-3">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Room List */}
        <div className="overflow-y-auto p-3 mb-9 pb-20">
          {Array.isArray(filteredRooms) &&
            filteredRooms.map((client, index) => (
              <div
                key={index}
                onClick={() => handleSelected(client)}
                className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src={
                      client.avatar ||
                      "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
                    }
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {client.firstname + " " + client.lastname}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="col-span-2 h-[87vh] relative">
        {selectedClient ? (
          <>
            <header className="bg-white p-4 text-gray-700">
              <h1 className="text-2xl font-semibold">
                {selectedClient.firstname + " " + selectedClient.lastname}
              </h1>
            </header>

            <div className="overflow-y-auto p-4 pb-36">
              {teamMessagesArray.map((message, index) => {
                const isMe =
                  message.senderId ===
                  (user?.member ? user.member.id : user?.id);

                return (
                  <div
                    key={index}
                    className={`flex mb-4 ${isMe ? "justify-end" : ""}`}
                  >
                    {!isMe && (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <img
                          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-96 p-3 gap-3 rounded-lg ${
                        isMe
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <p>{message.message}</p>
                      {Array.isArray(message?.fileUrls) &&
                        message?.fileUrls?.length > 0 && (
                          <FilePreviewFromCloudinary
                            files={message?.fileUrls}
                          />
                        )}
                      <p
                        className={`text-xs float-end ${
                          isMe ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {format(message.createdAt, "dd MMM hh:mm a")}
                      </p>
                    </div>
                    {isMe && (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
                          alt="My Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
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

                <div className="flex items-center space-x-2">
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
          <div className="h-full flex justify-center items-center text-gray-500">
            Select a user to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamChat;

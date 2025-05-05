// import { useState, useRef, useEffect } from "react";
// import useSocket from "../../context/SocketContext/useSocket";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { format } from "date-fns";
// function TeamChat() {
//   const { firmId } = useParams();
//   const {
//     teamChatRooms,
//     teamMessagesArray,
//     sendTeamMessage,
//     getTeamChatRooms,
//     getTeamMessages,
//   } = useSocket();
//   const [selectedClient, setSelectedClient] = useState(null);
//   console.log("🚀 ~ TeamChat ~ selectedClient:", selectedClient);
//   const { token, user } = useSelector((state) => state.auth);
//   const [messages, setMessages] = useState([
//     // Temporary mock data - replace with real data from backend
//     {
//       id: 1,
//       sender: "user",
//       message: "Hello, I need help with my tax filing.",
//       timestamp: "2024-03-15T10:00:00",
//       files: [],
//     },
//     {
//       id: 2,
//       sender: "lawfirm",
//       message:
//         "Hi! I'd be happy to help. Could you please share your tax documents?",
//       timestamp: "2024-03-15T10:01:00",
//       files: [],
//     },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "" && selectedFiles.length === 0) return;

//     const newMsg = {
//       senderId: user?.member ? user?.member?.id : user?.id,
//       receiverId: selectedClient?.id,
//       message: newMessage?.trim(),
//       recieverType: selectedClient?.ownerId ? "team" : "firm",
//       senderType: user?.member?.ownerId ? "team" : "firm",
//     };
//     console.log("🚀 ~ handleSendMessage ~ newMsg:", newMsg);
//     sendTeamMessage(newMsg);
//     setMessages([...messages, newMsg]);
//     setNewMessage("");
//     setSelectedFiles([]);
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles(files);
//   };
//   const handleSelected = (client) => {
//     setSelectedClient(client);
//     const user_id = user?.member ? user?.member?.id : user?.id;
//     getTeamMessages(user_id, user?.member ? "team" : "firm");
//   };
//   useEffect(() => {
//     let ownerId = user?.member?.ownerId ? user?.member?.ownerId : user?.id;
//     const userType = user?.member?.ownerId ? "team" : "firm";
//     const me = user?.member ? user?.member?.id : user?.id;
//     getTeamChatRooms(ownerId, me, userType);
//   }, [user]);
//   return (
//     <div className="grid lg:grid-cols-3 sm:grid-cols-1 h-[87vh] overflow-hidden">
//       {/* <!-- Sidebar --> */}
//       <div className=" col-span-1 bg-white border-r border-gray-300">
//         {/* <!-- Sidebar Header --> */}
//         <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
//           <h1 className="text-2xl font-semibold">Team Chat</h1>
//           <div className="relative">
//             <button id="menuButton" className="focus:outline-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-100"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                 <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
//               </svg>
//             </button>
//             {/* <!-- Menu Dropdown --> */}
//             <div
//               id="menuDropdown"
//               className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
//             >
//               <ul className="py-2 px-3">
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-gray-800 hover:text-gray-400"
//                   >
//                     Option 1
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-gray-800 hover:text-gray-400"
//                   >
//                     Option 2
//                   </a>
//                 </li>
//                 {/* <!-- Add more menu options here --> */}
//               </ul>
//             </div>
//           </div>
//         </header>

//         {/* <!-- Contact List --> */}
//         <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
//           {Array.isArray(teamChatRooms) &&
//             teamChatRooms?.map((client, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleSelected(client)}
//                 className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
//               >
//                 <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
//                   <img
//                     src={
//                       client?.avatar ||
//                       "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
//                     }
//                     alt="User Avatar"
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h2 className="text-lg font-semibold">
//                     {client?.firstname + " " + client?.lastname}
//                   </h2>
//                   {/* <p className="text-gray-600">Hoorayy!!</p> */}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* <!-- Main Chat Area --> */}
//       <div className="col-span-2 flex-1">
//         {/* <!-- Chat Header --> */}
//         {selectedClient && (
//           <>
//             <header className="bg-white p-4 text-gray-700">
//               <h1 className="text-2xl font-semibold">
//                 {selectedClient?.id
//                   ? selectedClient?.firstname + " " + selectedClient?.lastname
//                   : ""}
//               </h1>
//             </header>

//             <div className="h-[88vh] overflow-y-auto p-4 pb-36">
//               {teamMessagesArray?.map((message, index) => (
//                 <div key={index}>
//                   {message?.senderId ===
//                   (user?.member ? user?.member?.id : user?.id) ? (
//                     <div className="flex justify-end mb-4 cursor-pointer">
//                       <div className=" max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
//                         <p>{message?.message}</p>
//                         <p className="float-end text-xs text-white">
//                           {format(message?.createdAt, "dd MMM HH:mm a")}
//                         </p>
//                       </div>
//                       <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
//                         <img
//                           src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
//                           alt="My Avatar"
//                           className="w-8 h-8 rounded-full"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex mb-4 cursor-pointer">
//                       <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
//                         <img
//                           src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
//                           alt="User Avatar"
//                           className="w-8 h-8 rounded-full"
//                         />
//                       </div>
//                       <div className=" max-w-96 bg-white rounded-lg p-3 gap-3">
//                         <p className="text-gray-700">{message?.message}</p>
//                         <p className="text-gray-700 text-xs float-end">
//                           {format(message?.createdAt, "dd MMM HH:mm a")}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* <!-- Chat Input --> */}
//             <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-1/2 mb-5">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(event) => setNewMessage(event.target.value)}
//                   placeholder="Type a message..."
//                   className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
//                 />
//                 <button
//                   className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
//                   onClick={handleSendMessage}
//                 >
//                   Send
//                 </button>
//               </div>
//             </footer>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TeamChat;
import { useState, useRef, useEffect } from "react";
import useSocket from "../../context/SocketContext/useSocket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

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

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && selectedFiles.length === 0) return;

    const msg = {
      senderId: user?.member ? user.member.id : user?.id,
      receiverId: selectedClient?.id,
      message: newMessage.trim(),
      recieverType: selectedClient?.ownerId ? "team" : "firm",
      senderType: user?.member?.ownerId ? "team" : "firm",
      files: selectedFiles, // You'll need to support file uploads on backend
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

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 max-h-[87vh] overflow-hidden">
      {/* Sidebar */}
      <div className="col-span-1 bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Team Chat</h1>
        </header>

        <div className="overflow-y-auto h-[75vh] p-3 mb-9 pb-20">
          {Array.isArray(teamChatRooms) &&
            teamChatRooms.map((client, index) => (
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
      <div className="col-span-2 h-[87vh] flex-1 relative">
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
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
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

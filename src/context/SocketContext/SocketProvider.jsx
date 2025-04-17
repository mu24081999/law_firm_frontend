import { useState, useMemo, useEffect, useRef } from "react";
import SocketContext from "./SocketContext";
import _ from "lodash";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useMemo(() => io("https://localhost:7000"), []);
  // const socket = null;
  const [me, setMe] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);
  const [clientsArray, setClientsArray] = useState([]);
  const { user, tokem } = useSelector((state) => state.auth);
  useEffect(() => {
    if (socket) {
      socket.on("message_error", (err) => {
        toast.error(err);
      });
      socket.on("messages", (messages) => {
        setMessagesArray(messages);
      });
      socket.on("clients", (clients) => {
        setClientsArray(clients);
      });
      socket.emit("user-connected", user?.id);

      socket.on("updated_me", (userData) => {
        // dispatch(updatedMe(userData));
      });
      socket.on("me", (id) => setMe(id));
    }
  }, [socket, user, dispatch]);
  const getRooms = (userType, userId, me) => {
    socket.emit("getClients", {
      firmId: userId,
      userType: userType,
      me: me,
    });
  };
  const getMessages = (firmId, clientId) => {
    socket.emit("get-messages", {
      firmId,
      clientId,
    });
  };
  const sendMessage = (params) => {
    console.log("🚀 ~ sendMessage ~ params:", params);
    if (socket) {
      socket.emit("send-message", params);
    } else {
      console.error("Socket is not connected. Cannot send SMS.");
    }
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      me,
      clientsArray,
      sendMessage,
      messagesArray,
      getMessages,
      getRooms,
    }),
    [me, sendMessage, messagesArray, clientsArray, getMessages, getRooms]
  );
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SocketProvider;

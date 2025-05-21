import { useState, useMemo, useEffect, useCallback } from "react";
import SocketContext from "./SocketContext";
import _ from "lodash";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { showNotificationToast } from "../../components/showNotificationToast";
import notificationSound from "../../assets/notification.mp3";
const socketURL = import.meta.env.VITE_BACKEND_URL;

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useMemo(() => io(socketURL), []);
  const [me, setMe] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);
  const [clientsArray, setClientsArray] = useState([]);
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [teamMessagesArray, setTeamMessagesArray] = useState([]);
  const [teamChatRooms, setTeamChatRooms] = useState([]);
  const { user, tokem } = useSelector((state) => state.auth);

  useEffect(() => {
    if (socket) {
      console.log("🚀 ~ socket.on ~ socket:", socket.id);
      socket.on("message_error", (err) => {
        toast.error(err);
      });

      socket.on("messages", (messages) => {
        setMessagesArray(messages);
      });
      socket.on("notification", (data) => {
        console.log("🚀 ~ socket.on ~ notifications:", data);
        setNotificationsArray(data?.notifications);
        const audio = new Audio(notificationSound);
        audio.play();
        // showNotificationToast({
        //   type: "info",
        //   title: data?.current?.message,
        //   description: data?.current?.description,
        // });
      });
      socket.on("clients", (clients) => {
        setClientsArray(clients);
      });
      socket.on("members", (data) => {
        console.log("🚀 ~ socket.on ~ data:", data);
        setTeamChatRooms(data);
      });
      socket.on("team-messages", (data) => {
        setTeamMessagesArray(data);
      });
      socket.emit("user-connected", {
        user_id: user?.member ? user?.member?.id : user?.id,
        userType: user?.member ? "team" : "firm",
      });

      socket.on("updated_me", (userData) => {
        // dispatch(updatedMe(userData));
      });

      socket.on("me", (id) => setMe(id));
    }
  }, [socket, user, dispatch]);
  const pushNotification = useCallback(
    (notificationData) => {
      socket.emit("push-notification", notificationData);
    },
    [socket]
  );
  const getRooms = useCallback(
    (userType, userId, me) => {
      socket.emit("getClients", {
        firmId: userId,
        userType: userType,
        me: me,
      });
    },
    [socket]
  );
  const getTeamChatRooms = useCallback(
    (ownerId, me, userType) => {
      console.log(
        "🚀 ~ SocketProvider ~ ownerId, me, userType:",
        ownerId,
        me,
        userType
      );
      socket.emit("getTeamChatRooms", {
        ownerId,
        me,
        userType,
      });
    },
    [socket]
  );
  const getMessages = useCallback(
    (firmId, clientId) => {
      socket.emit("get-messages", {
        firmId,
        clientId,
      });
    },
    [socket]
  );
  const getTeamMessages = useCallback(
    (me, userType) => {
      socket.emit("teamChat", {
        me,
        userType,
      });
    },
    [socket]
  );
  const sendMessage = useCallback(
    (params) => {
      if (socket) {
        socket.emit("send-message", params);
      } else {
        console.error("Socket is not connected. Cannot send SMS.");
      }
    },
    [socket]
  );
  const sendTeamMessage = useCallback(
    (params) => {
      if (socket) {
        socket.emit("send-team-message", params);
      } else {
        console.error("Socket is not connected. Cannot send SMS.");
      }
    },
    [socket]
  );
  const value = useMemo(
    () => ({
      me,
      clientsArray,
      messagesArray,
      teamChatRooms,
      teamMessagesArray,
      sendMessage,
      getMessages,
      getRooms,
      getTeamChatRooms,
      sendTeamMessage,
      getTeamMessages,
      pushNotification,
    }),
    [
      me,
      clientsArray,
      messagesArray,
      teamChatRooms,
      teamMessagesArray,
      getMessages,
      getRooms,
      getTeamChatRooms,
      sendMessage,
      sendTeamMessage,
      getTeamMessages,
      pushNotification,
    ]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;

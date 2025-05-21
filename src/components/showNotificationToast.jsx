import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"; // Optional: use any icon library
import notificationSound from "./../assets/notification.mp3"; // Your sound file path

export const showNotificationToast = ({
  type = "success",
  title,
  description,
}) => {
  const audio = new Audio(notificationSound);
  audio.play();

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-6 h-6" />;
      case "error":
        return <XCircle className="text-red-500 w-6 h-6" />;
      case "info":
        return <Info className="text-blue-500 w-6 h-6" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500 w-6 h-6" />;
      default:
        return null;
    }
  };

  toast(
    <div className="flex gap-3 items-start">
      {getIcon()}
      <div>
        <h4 className="font-semibold text-base">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>,
    {
      type,
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    }
  );
};

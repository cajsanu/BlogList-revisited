import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

export const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  if (notification === null) {
    return null;
  }
  return <div className="notification">{notification}</div>;
};

// export const ErrorMessage = () => {
//   const [notification, notificationDispatch] = useContext(NotificationContext);
//   if (notification === null) {
//     return null;
//   }
//   return <div className="error">{notification}</div>;
// };

import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { Alert } from "react-bootstrap";

export const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  if (notification === null) {
    return null;
  }
  return (
    <div className="container">
      <Alert>{notification}</Alert>
    </div>
  );
};

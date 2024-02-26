import { createContext, useReducer, useEffect } from "react";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return `Logged in as ${action.payload}`;
    case "LOGOUT":
      return action.payload;
    case "CREATE":
      return `Created new blog: ${action.payload}`;
    case "DELETE":
      return `Deleted ${action.payload}`;
    case "LIKE":
      return `You liked ${action.payload}`;
    case "ERROR":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    NotificationReducer,
    null
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

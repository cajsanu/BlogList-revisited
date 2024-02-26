import { createContext, useReducer, useEffect } from "react";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
        return action.payload
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(
    UserReducer,
    null
  );

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       notificationDispatch({ type: "CLEAR" });
//     }, 5000);
//     return () => clearTimeout(timeout);
//   }, [notification]);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

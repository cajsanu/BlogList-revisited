import { useState, useContext, useEffect } from "react";
import blogRequests from "../requests/blogs";
import UserContext from "../contexts/UserContext";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useSetUser = () => {
  const [user, userDispatch] = useContext(UserContext);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SETUSER", payload: user });
      blogRequests.setToken(user.token);
    }
  }, []);
};

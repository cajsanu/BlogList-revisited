import { useState, useEffect, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogRequests from "../requests/blogs";
import loginRequests from "../requests/login";
import NotificationContext from "../contexts/NotificationContext";
import UserContext from "../contexts/UserContext";

const LoginForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SETUSER", payload: user });
      blogRequests.setToken(user.token);
    }
  }, user);

  const newLoginMutation = useMutation({
    mutationFn: loginRequests.login,
    onSuccess: (user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogRequests.setToken(user.token);
      userDispatch({ type: "SETUSER", payload: data });
      notificationDispatch({ type: "LOGIN", payload: userObject.username });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      if (error.response.status === 401) {
        notificationDispatch({
          type: "ERROR",
          payload: "Wrong username or password",
        });
      } else {
        console.error("Login error:", error.message);
      }
    },
  });

  if (newLoginMutation.isLoading) {
    return <h1>Wait...</h1>;
  }

  const addUser = async (event) => {
    event.preventDefault();
    const userObject = { username: username, password: password };
    newLoginMutation.mutate(userObject);
    console.log("logging in with", userObject.username, userObject.password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={addUser}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

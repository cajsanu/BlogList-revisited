import { useState, useEffect, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogRequests from "../requests/blogs";
import loginRequests from "../requests/login";
import NotificationContext from "../contexts/NotificationContext";
import UserContext from "../contexts/UserContext";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const newLoginMutation = useMutation({
    mutationFn: loginRequests.login,
    onSuccess: (user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogRequests.setToken(user.token);
      userDispatch({ type: "SETUSER", payload: user });
      notificationDispatch({
        type: "LOGIN",
        payload: user.username,
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
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

  const addUser = (event) => {
    event.preventDefault();
    const userObject = { username: username, password: password };
    newLoginMutation.mutate(userObject);
    console.log("logging in with", userObject.username, userObject.password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Form onSubmit={addUser}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" id="login-button">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

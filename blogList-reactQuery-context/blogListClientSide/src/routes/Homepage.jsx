import { useRef, useContext } from "react";
import "../App.css";
import {
  Togglable,
  Blogs,
  Notification,
  LoginForm,
  BlogForm,
} from "../components";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useSetUser } from "../hooks";
import { Button } from "react-bootstrap";

function App() {
  const [user, userDispatch] = useContext(UserContext);
  const blogFormRef = useRef();

  useSetUser()

  return (
    <div className="container">
      <Notification />
      <Header />
      <div>
        {user === null ? (
          <Togglable showContent="Log In" hideContent="Cancel">
            <LoginForm />
          </Togglable>
        ) : (
          <div>
            <Togglable
              showContent="New Blog"
              hideContent="Cancel"
              ref={blogFormRef}
            >
              <BlogForm />
            </Togglable>
            <Blogs />
          </div>
        )}
      </div>
      <Link to={"/users"}>
        <Button> View users</Button>
      </Link>
    </div>
  );
}

export default App;

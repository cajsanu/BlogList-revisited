import LogoutButton from "./LogoutButton";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import blogRequests from "../requests/blogs";

const Header = () => {
  const [user, userDispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SETUSER", payload: user });
      blogRequests.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {user ? (
        <div>
          <p>{user.name} logged in</p>
          <LogoutButton />
        </div>
      ) : null}
    </div>
  );
};

export default Header;

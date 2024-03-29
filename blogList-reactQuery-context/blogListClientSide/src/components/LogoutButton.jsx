import { useContext } from "react"; 
import UserContext from "../contexts/UserContext";
import NotificationContext from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom"; 
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const [user, userDispatch] = useContext(UserContext);
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    navigate("/")
    userDispatch({ type: "SETUSER", payload: null });
    notificationDispatch({ type: "LOGOUT", payload: "Logged out" });
    console.log("Logging out");
  };

  return <Button onClick={handleLogout} text={"Log out"} >Log out</Button>;
};

export default LogoutButton;

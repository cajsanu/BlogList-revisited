import LogoutButton from "./LogoutButton";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";


const Header = () => {
  const [user] = useContext(UserContext);

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

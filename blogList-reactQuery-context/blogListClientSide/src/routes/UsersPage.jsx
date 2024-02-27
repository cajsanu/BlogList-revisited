import userRequests from "../requests/users";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"; 
import Header from "../components/Header";

const User = ({ user }) => {
  return (
    <tr>
      <td><Link key={user.name} to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const Users = () => {
  const style = {
    display: "flex",
    "justify-content": "center",
  };

  const getAllUsers = useQuery({
    queryKey: ["users"],
    queryFn: userRequests.getAll,
  });

  if (getAllUsers.isLoading) {
    return <div>Loading users</div>;
  }

  const users = getAllUsers.data;

  return (
    <div>
      <Header />
      <h3>Users</h3>
      <table style={style}>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>Blogs created</td>
          </tr>
          {users.map((user) => (
            <User key={user.username} user={user} />
          ))}
        </tbody>
      </table>
      <Link to="/"><button>View blogs</button></Link>
    </div>
  );
};

export default Users;

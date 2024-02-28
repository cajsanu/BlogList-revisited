import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userRequests from "../requests/users";
import Header from "../components/Header";
import { useSetUser } from "../hooks";

const BlogOfUser = ({ blog }) => {
  return <li>{blog.title}</li>;
};

const User = () => {
  const params = useParams();
  
  useSetUser()

  const getAllUsers = useQuery({
    queryKey: ["users"],
    queryFn: userRequests.getAll,
  });

  if (getAllUsers.isLoading) {
    return <div>Loading users</div>;
  }

  const users = getAllUsers.data;
  const user = users.find((user) => user.id === params.id);

  return (
    <div>
      <Header />
      <h3>{user.name}</h3>
      {user.blogs.map((blog) => (
        <BlogOfUser key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default User;

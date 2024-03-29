import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogRequests from "../requests/blogs";
import Header from "../components/Header";
import NotificationContext from "../contexts/NotificationContext";
import { useContext } from "react";
import { Notification, CommentForm } from "../components";
import { useSetUser } from "../hooks";
import { Button } from "react-bootstrap";


const Blog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  useSetUser()

  const DeleteBlogMutation = useMutation({
    mutationFn: blogRequests.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
    onError: () => {
      notificationDispatch({ type: "ERROR", payload: "Cannot delete blog" });
    },
  });

  const LikeBlogMutation = useMutation({
    mutationFn: blogRequests.updateLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      notificationDispatch({ type: "ERROR", payload: "Cannot like blog" });
    },
  });

  const getAllBlogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogRequests.getAll,
  });
  if (getAllBlogs.isLoading) {
    return (
      <h3>I'm having problems connecting to the server, give me a moment...</h3>
    );
  }
  if (getAllBlogs.isError) {
    return <h1>Nope...</h1>;
  }
  const blogs = getAllBlogs.data;
  const blog = blogs.find((blog) => blog.id === params.id);

  const handleDelete = (blog) => {
    if (
      window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`)
    ) {
      DeleteBlogMutation.mutate(blog.id);
      notificationDispatch({ type: "DELETE", payload: blog.title });
    }
  };

  const handleLike = (blog) => {
    LikeBlogMutation.mutate(blog.id);
    notificationDispatch({ type: "LIKE", payload: blog.title });
  };

  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  const user = JSON.parse(loggedUserJSON);


  return (
    <div>
      <Notification />
      <Header />
      <h2>{blog.title}</h2>
      <div>
        <p>
          {blog.author} - {blog.url}
        </p>
        <p>
          {blog.likes} likes
          <Button onClick={() => handleLike(blog)}>Like</Button>
        </p>
      </div>
      {user.username === blog.user.username ? (
        <div>
          <p>added by {blog.user.name}</p>
          <Button onClick={() => handleDelete(blog)}>Delete</Button>
        </div>
      ) : null}
      <CommentForm id={blog.id}/>
      {blog.comments.map((comment) => {
        return <li key={comment}>{comment}</li>;
      })}
    </div>
  );
};

export default Blog;

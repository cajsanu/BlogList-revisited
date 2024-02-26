import { useContext } from "react";
import { Button, Togglable } from ".";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../contexts/NotificationContext";
import blogRequests from "../requests/blogs";

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="Blog">
      <div>
        <>
          {props.title} by {props.author}
        </>
      </div>
      <div>
        <Togglable showContent="View" hideContent="Hide">
          <p>
            {props.url} - {props.likes} likes{" "}
            <Button onClick={props.onLikeClick} text="Like" />
          </p>
          <p>{props.user}</p>
          {props.children}
        </Togglable>
      </div>
    </div>
  );
};

const Blogs = ({ username }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const DeleteBlogMutation = useMutation({
    mutationFn: blogRequests.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
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
  const blogs = getAllBlogs.data.sort((a, b) => {
    return b.likes - a.likes;
  });

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

  return (
    <div>
      <h3>Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            author={blog.author}
            title={blog.title}
            url={blog.url}
            likes={blog.likes}
            user={blog.user.name}
            onLikeClick={() => handleLike(blog)}
          >
            {username === blog.user.username ? (
              <Button onClick={() => handleDelete(blog)} text={"Delete"} />
            ) : null}
          </Blog>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;

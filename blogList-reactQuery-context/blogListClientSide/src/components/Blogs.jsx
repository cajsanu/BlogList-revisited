import { useQuery } from "@tanstack/react-query";
import blogRequests from "../requests/blogs";
import { Link } from "react-router-dom"; 

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
        <Link to={`/blogs/${props.id}`}>
          {props.title} by {props.author}
        </Link>
      </div>
    </div>
  );
};

const Blogs = () => {

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

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            author={blog.author}
            title={blog.title}
            url={blog.url}
            likes={blog.likes}
            user={blog.user.name}
          >
          </Blog>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;

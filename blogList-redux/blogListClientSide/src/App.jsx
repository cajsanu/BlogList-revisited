import { useEffect, useRef } from "react";
import "./App.css";
import {
  Togglable,
  Blog,
  Button,
  Notification,
  LoginForm,
  BlogForm,
} from "./components";
import { initialiseBlogs, createBlog, deleteBlog, likeBlog } from "./reducers/blogReducer";
import { notification } from "./reducers/notificationReducer";
import { setUser, removeUser, loginUser } from "./reducers/userReducer";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

function App() {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  const blogs = useSelector(({ blogs }) => {
    const orderByLikes = blogs.slice().sort((a, b) => {
      return b.likes - a.likes
    })
    return orderByLikes
  }, shallowEqual);

  const user = useSelector(({user}) => user)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user)
      dispatch(setUser(user));
    }
  }, []);

  const handleLogin = (userObject) => {
    console.log(userObject)
    try {
      dispatch(loginUser(userObject))
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(notification("Wrong username or password", 5));
      } else {
        console.error("Login error:", error.message);
      }
    }
    console.log("logging in with", userObject.username, userObject.password);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
    dispatch(notification("You are now logged out", 5));
  };

  const handleNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
      dispatch(notification("New blog addded successfully", 5));
    } catch (error) {
      dispatch(notification("All fields must be filled in", 5));
    }
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = (blog) => {
    if (
      window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`)
    ) {
      dispatch(deleteBlog(blog.id))
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <div>
        {user === null ? (
          <Togglable showContent="Log In" hideContent="Cancel">
            <LoginForm createUser={handleLogin} />
          </Togglable>
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <Togglable
              showContent="New Blog"
              hideContent="Cancel"
              ref={blogFormRef}
            >
              <BlogForm createBlog={handleNewBlog} />
            </Togglable>
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
                  {user.username === blog.user.username ? (
                    <Button
                      onClick={() => handleDelete(blog)}
                      text={"Delete"}
                    />
                  ) : null}
                </Blog>
              ))}
            </ul>
            <Button onClick={handleLogout} text={"Log out"} />
          </div>
        )}
      </div>
      made by Cajsa
    </div>
  );
}

export default App;

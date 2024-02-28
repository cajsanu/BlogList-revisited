import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../contexts/NotificationContext";
import blogRequests from "../requests/blogs";
import { Form, Button } from "react-bootstrap";

const BlogForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogRequests.createBlog,
    onSuccess: (data) => {
      notificationDispatch({ type: "CREATE", payload: data.title });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      notificationDispatch({ type: "ERROR", payload: "Cannot make new blog" });
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = { title: blogTitle, author: blogAuthor, url: blogUrl };
    newBlogMutation.mutate(blogObject);

    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog title"
            id="title"
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog author"
            id="author"
            value={blogAuthor}
            onChange={(event) => setBlogAuthor(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog url"
            id="URL"
            value={blogUrl}
            onChange={(event) => setBlogUrl(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default BlogForm;

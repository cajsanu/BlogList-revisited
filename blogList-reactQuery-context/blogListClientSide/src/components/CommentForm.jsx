import { useField } from "../hooks";
import { useContext } from "react";
import blogRequests from "../requests/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../contexts/NotificationContext";
import { Button } from "react-bootstrap";

const CommentForm = ({ id }) => {
  const comment = useField("text");
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: blogRequests.createComment,
    onSuccess: () => {
      notificationDispatch({ type: "CREATE", payload: "Added new comment" });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      notificationDispatch({
        type: "ERROR",
        payload: "Cannot make new comment",
      });
    },
  });

  const handleComment = (event) => {
    event.preventDefault();
    newCommentMutation.mutate({ id: id, comment: comment.value });
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input {...comment} />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CommentForm;

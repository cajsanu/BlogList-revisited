import axios from "axios";
const URL = "/api/blog_list";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(URL);
  console.log(response.data);
  return response.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(URL, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("delete", id, config);
  const request = await axios.delete(`${URL}/${id}`, config);
  return request.data;
};

const updateLikes = (id) => {
  const request = axios.post(`${URL}/${id}/like`);
  return request.then((response) => response.data);
};

const updateBlog = (id, blog) => {
  const request = axios.put(`${URL}/${id}`, blog);
  return request.then((response) => response.data);
};

const createComment = async ({ id, comment }) => {
  const response = await axios.post(`${URL}/${id}/comments`, {comment: comment});
  console.log(response);
  return response.data;
};

export default {
  getAll,
  setToken,
  createBlog,
  deleteBlog,
  updateLikes,
  updateBlog,
  createComment,
};

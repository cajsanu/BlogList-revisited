import axios from "axios";
const URL = "/api/users";

const getAll = async () => {
  const request = await axios.get(URL);
  return request.data;
};

export default { getAll };

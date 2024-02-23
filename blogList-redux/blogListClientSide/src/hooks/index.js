import axios from "axios";
import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};

// export const useService = (baseUrl) => {
//   const [resources, setResources] = useState([]);
//   const getAll = async () => {
//     const response = await axios.get(baseUrl);
//     setResources(response.data);
//   };

//   const services = {
//     getAll,
//   };

//   return [resources, services];
// };

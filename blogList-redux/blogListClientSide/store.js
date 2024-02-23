import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./src/reducers/blogReducer";
import notificationReducer from "./src/reducers/notificationReducer"
import userReducer from "./src/reducers/userReducer";

const combinedStore = configureStore({
  reducer: { blogs: blogReducer, notification: notificationReducer, user: userReducer },
});

export default combinedStore
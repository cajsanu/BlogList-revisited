import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Homepage.jsx";
import UsersPage from "./routes/UsersPage.jsx";
import SingleUserPage from "./routes/SingleUserPage.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import "./index.css";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/:id",
    element: <SingleUserPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);

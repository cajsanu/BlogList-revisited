// import { useRef, useContext } from "react";
// import "./App.css";
// import {
//   Togglable,
//   Blogs,
//   Button,
//   Notification,
//   LoginForm,
//   BlogForm,
//   LogoutButton
// } from "./components";
// import UserContext from "./contexts/UserContext";
// import NotificationContext from "./contexts/NotificationContext";

// function App() {
//   const [user, userDispatch] = useContext(UserContext);
//   const [notification, notificationDispatch] = useContext(NotificationContext)
//   const blogFormRef = useRef();

//   const handleLogout = () => {
//     window.localStorage.removeItem("loggedBlogappUser");
//     userDispatch({ type: "SETUSER", payload: null });
//     notificationDispatch({ type: "LOGOUT", payload: "Logged out" })
//     console.log("Logging out")
//   };

//   return (
//     <div>
//       <Notification />
//       <div>
//         {user === null ? (
//           <Togglable showContent="Log In" hideContent="Cancel">
//             <LoginForm />
//           </Togglable>
//         ) : (
//           <div>
//             <p>{user.name} logged in</p>
//             <Togglable
//               showContent="New Blog"
//               hideContent="Cancel"
//               ref={blogFormRef}
//             >
//               <BlogForm />
//             </Togglable>
//             <Blogs username={user.username} />
//             <Button onClick={handleLogout} text={"Log out"} />
//           </div>
//         )}
//       </div>
//       <LogoutButton />
//     </div>
//   );
// }

// export default App;

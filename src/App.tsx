import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import { logout } from "./utils/logout";

import MyPosts from "./pages/myPosts/MyPosts";
import About from "./pages/about/About";
import Auth from "./pages/authentication/Auth";
import Feed from "./pages/feed/Feed";
import UserPoints from "./components/UserPoints";
import ProtectedRoute from "./components/ProtectedRoute";
import DisplayBadges from "./components/DisplayBadges";

import styles from "./App.module.css";
import "@mattilsynet/design";
import "@mattilsynet/design/styles.css";
import { Button, Avatar } from "@mattilsynet/design/react";

function App() {
  const { user } = useAuth();

  let userId;
  if (user) {
    userId = user.uid;
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 100 152"
          >
            <path
              fill="currentcolor"
              d="M125.4 22.85c.21 23.4-14.8 44.66-36.6 50.99a58.58 58.58 0 0 0-2.44-7.2 43.73 43.73 0 0 0 30.8-36.19c-16.19.85-30.22 10.84-36.86 25.06a59.12 59.12 0 0 0-5.2-6.48c8.75-15.68 25.45-26.23 44.3-26.23l6 .05ZM83.55 129.2h-7.6V91.18c-28-.76-49.71-25.07-49.35-53.08 30.24-2.97 57.1 20.98 56.94 51.7.03 4.13.01 25.21.01 39.4Zm-8.13-45.64C72.74 62.85 55.56 46.8 34.84 45.7c2.7 20.72 19.89 36.78 40.58 37.86Z"
            ></path>
          </svg>
          MyBlog
        </div>
        <div>
          <ul className={styles["navbar-container"]}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/myposts">My Posts</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
            <li>
              <Link to="auth">Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <ul>
          <li className={styles["user-data"]}>
            {user && (
              <>
                <li>
                  <UserPoints />
                </li>
                <li>
                  <DisplayBadges />
                </li>
                <Avatar href="#">{userId}</Avatar>
              </>
            )}
            {user && (
              <li>
                <Button onClick={logout}>Log Out</Button>
              </li>
            )}
          </li>
        </ul>
      </div>

      <div>
        <div className={styles["bilde-container"]}>
          <img src="https://design.mattilsynet.no/docs/bilder/kontor-to-utviklere-snakker.jpg"></img>
        </div>
        <figcaption>Bilde: Mattilsynet</figcaption>
      </div>

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/myposts" element={<MyPosts />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;

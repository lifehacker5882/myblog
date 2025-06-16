import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import { logout } from "./utils/logout";

import MyPosts from "./pages/MyPosts";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import UserPoints from "./components/UserPoints";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <>
      <nav>
        <ul>
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
          {user && (
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          )}
          <li>
            <UserPoints />
          </li>
          <li></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;

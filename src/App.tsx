import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import { logout } from "./utils/logout";

import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
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
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="auth">Auth</Link>
          </li>
          {user && (
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;

import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import React, { type JSX } from "react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

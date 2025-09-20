import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import React, { type JSX } from "react";
import { Spinner } from "@mattilsynet/design/react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        Loading...
        <Spinner />
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

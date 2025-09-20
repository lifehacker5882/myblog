import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

import { Field, Button } from "@mattilsynet/design/react";
import styles from "./Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: unknown) {
      // Surface Firebase error codes to aid debugging (e.g., auth/operation-not-allowed, auth/invalid-credential)
      const err = error as { code?: string; message?: string };
      console.error("Authentication error:", err);
      setError(`Auth failed${err?.code ? ` (${err.code})` : ""}. ${err?.message ?? "Please try again."}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isRegistering ? "Register" : "Log in"}</h2>
      <form onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <div className={styles.buttons}>
          <Button data-variant="primary" type="submit">
            {isRegistering ? "Register" : "Log in"}
          </Button>
          <Button
            data-variant="secondary"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Got an account? Log in" : "New user? Register"}
          </Button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;

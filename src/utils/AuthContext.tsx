import { createContext, useContext, useEffect, useState } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { userDataExists } from "./userData";

type AuthContextProps = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        userDataExists(firebaseUser.uid, firebaseUser.email || "");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

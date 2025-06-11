import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

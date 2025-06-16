import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const userDataExists = async (uid: string, email: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email,
      points: 0,
    });
  }
};

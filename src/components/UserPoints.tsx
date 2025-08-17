import { useAuth } from "../utils/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { getLevels } from "../utils/userLevels";

const UserPoints = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user) return;
      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (userSnap.exists()) {
        setPoints(userSnap.data().points);
      }
    };
    fetchUserPoints();
  }, [user]);

  const level = getLevels(points);

  return user ? (
    <div>
      <div>Points: {points}</div>
      <div>Level: {level}</div>
    </div>
  ) : (
    <div>Log in to see your points.</div>
  );
};

export default UserPoints;

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../utils/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const DisplayBadges = () => {
  const [badges, setBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setBadges([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchBadges = async () => {
      const badgeRef = doc(db, "users", user.uid);
      const badgeSnap = await getDoc(badgeRef);

      if (badgeSnap.exists()) {
        const data = badgeSnap.data();
        if (Array.isArray(data.badges) && data.badges.length > 0) {
          setBadges(data.badges);
        } else {
          setBadges([]);
        }
      } else {
        console.log("Unable to fetch badges");
        setBadges([]);
      }
      setLoading(false);
    };

    fetchBadges();
  }, [user]);

  if (loading) return <div>Loading badges...</div>;

  return (
    <div>
      {badges.length > 0 ? (
        <ul>
          {badges.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      ) : (
        "Log in to see your badges"
      )}
    </div>
  );
};

export default DisplayBadges;

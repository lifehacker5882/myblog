import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../utils/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Badges = () => {
  const [badges, setBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setBadges([]), setLoading(false);
      return;
    }

    const fetchBadges = async () => {
      const badgeRef = doc(db, "users", user.uid);
      const badgeSnap = await getDoc(badgeRef);

      if (badgeSnap.exists()) {
        const data = badgeSnap.data();
        if (Array.isArray(data.badges) && data.badges.length > 0) {
          //console.log("You have the following badges: ", data.badges);
          setBadges(data.badges);
        } else {
          //console.log("You have no badges");
        }
      } else {
        console.log("No such document");
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
        "You have no badges"
      )}
    </div>
  );
};

export default Badges;

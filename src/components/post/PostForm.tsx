import { useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  increment,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../utils/AuthContext";
import { allBadges } from "../../utils/badges";
import { getLevels } from "../../utils/userLevels";

type PostFormProps = {
  onPostAdded: () => void;
};

const PostForm: React.FC<PostFormProps> = ({ onPostAdded }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content || !user) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: Timestamp.now(),
        userId: user.uid,
      });

      await updateDoc(doc(db, "users", user.uid), {
        points: increment(10),
        postCount: increment(1),
      });

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (userData && Array.isArray(userData.badges)) {
        const postCount = userData.postCount;
        const level = getLevels(userData.points);

        const newBadges = allBadges.filter(
          (badge) =>
            badge.earned({ postCount, level, lastPostDate: new Date() }) &&
            !userData.badges.includes(badge.id)
        );

        if (newBadges.length > 0) {
          await updateDoc(userRef, {
            badges: [...userData.badges, ...newBadges.map((badge) => badge.id)],
          });
        }
      }

      setTitle("");
      setContent("");
      onPostAdded();
    } catch (error) {
      console.log("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Publish"}
      </button>
    </form>
  );
};

export default PostForm;

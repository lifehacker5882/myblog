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
import { type JSONContent } from "@tiptap/react";
import { useAuth } from "../../utils/AuthContext";
import { allBadges } from "../../utils/badges";
import { getLevels } from "../../utils/userLevels";
import TextEditor from "../editor/TextEditor";

import { Button } from "@mattilsynet/design/react";
import { Field } from "@mattilsynet/design/react";

type PostFormProps = {
  onPostAdded: () => void;
};

const PostForm: React.FC<PostFormProps> = ({ onPostAdded }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<JSONContent>({} as JSONContent);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content) return;

    setLoading(true);

    try {
      await createPosts();
      await updateProgress();
      await awardBadges();

      setTitle("");
      setContent({} as JSONContent);
      onPostAdded();
    } catch (error) {
      console.log("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPosts = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      createdAt: Timestamp.now(),
      userId: user.uid,
    });
  };

  const updateProgress = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      points: increment(10),
      postCount: increment(1),
    });
  };

  const awardBadges = async () => {
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
          badges: [...userData.badges, ...newBadges.map((b) => b.id)],
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <div>
        <label htmlFor="content">Content</label>
        <TextEditor content={content} onChange={setContent} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Publish"}
      </Button>
    </form>
  );
};

export default PostForm;

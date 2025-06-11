import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

type PostFormProps = {
  onPostAdded: () => void;
};

const PostForm: React.FC<PostFormProps> = ({ onPostAdded }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
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

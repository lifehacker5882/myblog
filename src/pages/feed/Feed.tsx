import PostList from "../../components/post/PostList";

import { useState, useEffect } from "react";
import { type Post } from "../../types/post";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner } from "@mattilsynet/design/react";

import styles from "./Feed.module.css";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>Posts</h1>
        {loading ? (
          <div>
            Loading...
            <Spinner />
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </>
  );
};

export default Feed;

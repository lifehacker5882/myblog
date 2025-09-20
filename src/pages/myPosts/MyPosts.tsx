import PostForm from "../../components/post/PostForm";
import PostList from "../../components/post/PostList";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../utils/AuthContext";
import type { Post } from "../../types/post";

import styles from "./MyPosts.module.css";
import { Spinner } from "@mattilsynet/design/react";

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "posts"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <h1>My Posts</h1>
        {loading ? (
          <div>
            Loading...
            <Spinner />
          </div>
        ) : (
          <>
            <PostForm onPostAdded={fetchPosts} />
            <PostList posts={posts} />
          </>
        )}
      </div>
    </>
  );
};

export default MyPosts;

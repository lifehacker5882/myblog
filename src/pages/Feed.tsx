import PostList from "../components/post/PostList";

import React, { useState, useEffect } from "react";
import { type Post } from "../types/post";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <h1>All posts</h1>
        <PostList posts={posts} />{" "}
      </div>
    </>
  );
};

export default Feed;

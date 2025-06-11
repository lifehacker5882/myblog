import PostForm from "../components/post/PostForm";
import PostList from "../components/post/PostList";
import About from "./About";
import Auth from "./Auth";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number };
};

const Home: React.FC = () => {
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
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <h1>My Blog</h1>
        <PostForm onPostAdded={fetchPosts} />
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default Home;

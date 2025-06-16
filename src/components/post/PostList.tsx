import type { Post } from "../../types/post";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../utils/AuthContext";

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { user } = useAuth();

  const handleDelete = async (id: string) => {
    console.log("delete");

    await deleteDoc(doc(db, "posts", id));
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            {new Date(post.createdAt.seconds * 1000).toLocaleString("no-NO")}
          </p>
          {user && user.uid === post.userId && (
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;

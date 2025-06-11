import { type Post } from "../../pages/Home";

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            {new Date(post.createdAt.seconds * 1000).toLocaleString("no-NO")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;

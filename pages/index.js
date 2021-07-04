import PostCard from "../components/postCard";
import prisma from "../db/connect";
import { allPosts } from "../db/post";

export default function Home({ posts }) {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <div className="space-y-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await allPosts(prisma);
  const serializedPosts = posts.map((post) => {
    return {
      ...post,
      createdAt: post.createdAt.toString(),
    };
  });
  return {
    props: {
      posts: serializedPosts,
    },
  };
}

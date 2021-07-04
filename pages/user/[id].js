import PostCard from "../../components/postCard";
import prisma from "../../db/connect";
import { allPostsByUser } from "../../db/post";
import createDate from "../../utils/createDate";

export default function UserPage({ userPosts }) {
  return (
    <div className="flex flex-col justify-center items-center pt-20 space-y-1">
      {userPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const userPosts = await allPostsByUser(prisma, parseInt(context.query.id));
  const serializedUserPosts = userPosts.map((post) => {
    return {
      ...post,
      createdAt: createDate(post.createdAt),
    };
  });
  return {
    props: {
      userPosts: serializedUserPosts,
    },
  };
}

import React, { useCallback, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import prisma from "../../db/connect";
import { allPosts, getPost } from "../../db/post";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatDistance } from "date-fns";
import createDate from "../../utils/createDate";
import useSWR, { mutate } from "swr";
import useProtectedRoute from "../../utils/useProtectedRoute";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });

export default function PostPage({ post }) {
  const { data: comments } = useSWR(`/api/posts/${post.id}/comments`, fetcher);
  const [newComment, setNewComment] = useState("");
  const [session] = useSession();
  const router = useRouter();
  useProtectedRoute();

  const handleAddComment = useCallback(async () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment === "") return;
    if (!session) router.push("/signup");

    await fetch("/api/comments", {
      body: JSON.stringify({
        content: newComment,
        userId: session.user.id,
        postId: post.id,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //tell swr to refetch
    mutate(`/api/posts/${post.id}/comments`);
    setNewComment("");
  }, [newComment, post, session, router]);

  return (
    <div className="flex flex-col justify-center items-center pt-20 space-y-2">
      <div
        className="border border-gray-200 px-1 rounded-md"
        style={{ width: 600 }}
      >
        <div className="text-left text-xl">
          Title: <span className="">{post.title}</span>
        </div>

        <span>Content:</span>
        <div>{post.content}</div>
      </div>
      <div
        className="border border-gray-200 px-1 rounded-md"
        style={{ width: 600 }}
      >
        <div>Comments:</div>
        {comments ? (
          <div className="space-y-1">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-md bg-gray-100 p-2">
                <div className="fex flex-row space-x-2">
                  <Link href={`/user/${comment.user.id}`}>
                    <a className="text-sm">{comment.user.name}</a>
                  </Link>
                  <span className="text-xs text-gray-400">
                    {formatDistance(new Date(comment.createdAt), new Date())}{" "}
                    ago
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <span>Loading comments</span>
        )}
        {session ? (
          <div className="flex flex-row justify-between p-1">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              style={{ width: 450 }}
            />
            <button
              className="bg-gray-200 rounded-md p-1 text-sm"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        ) : (
          <span onClick={() => signIn()} className="text-xs text-gray-400 cursor-pointer">
            Login to add comments
          </span>
        )}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await allPosts(prisma);
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const post = await getPost(prisma, parseInt(params.id));
  post.createdAt = createDate(post.createdAt);
  // Pass post data to the page via props
  return {
    props: { post },
    revalidate: 1,
  };
}

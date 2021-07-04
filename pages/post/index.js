import { getSession } from "next-auth/client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";

export default function CreatePostPage({session}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();


  const handleSubmitPost = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("/api/posts", {
        body: JSON.stringify({
          title,
          description,
          userId: session.user.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    },
    [session, title, description]
  );

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <form
        className="flex flex-col border border-gray-200 p-2 w-80 space-y-1 text-gray-700"
        onSubmit={handleSubmitPost}
      >
        <label htmlFor="title">Title:</label>
        <input
          className="border pl-1 border-gray-200"
          value={title}
          placeholder="Enter post title"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          name="title"
          autoComplete="off"
        />
        <label htmlFor="desc">Description:</label>
        <textarea
          className="border border-gray-200 pl-1"
          value={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
          id="desc"
          name="desc"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            value="Submit"
            className="text-right border border-gray-200 p-1 text-gray-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

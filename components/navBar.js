import { useCallback } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

function NavBar() {
  const [session] = useSession();
  const router = useRouter();
  const isOnCreatePostPage = router.route === "/post";

  const handleButtonClicked = useCallback(
    (e) => {
      e.preventDefault();
      if (session) signOut();
      else signIn();
    },
    [session, signIn, signOut]
  );

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 p-4 bg-gray-400">
      <Link href="/">
        <a className="text-lg">Next Auth test</a>
      </Link>
      <div className="flex flex-row space-x-1">
        {session ? (
          <Link href={`/user/${session.user.id}`}>
            <a className="rounded-sm bg-white py-1 px-2">
              Show Posts
            </a>
          </Link>
        ): null}
        {session && !isOnCreatePostPage ? (
          <Link href="/post">
            <a className="rounded-sm bg-white py-1 px-2">Create Post</a>
          </Link>
        ) : null}
        <button
          className="rounded-sm bg-white py-1 px-2"
          onClick={handleButtonClicked}
        >
          {session ? "Log out" : "Log in"}
        </button>
      </div>
    </div>
  );
}

export default NavBar;

import { formatDistance, formatISO } from "date-fns";
import Link from "next/link";

function PostCard({ post }) {
  return (
    <div
      className="border border-gray-200 rounded-md px-2 py-1"
      style={{ width: 600 }}
    >
      <div className="flex flex-row space-x-1">
        <span className="text-xs text-gray-400">
          Posted by{" "}
          <Link href={`/user/${post.authorId}`}>
            <a>{post.user.name}</a>
          </Link>
        </span>
        <span className="text-xs text-gray-400">
          {formatDistance(new Date(post.createdAt), new Date())} ago
        </span>
      </div>
      <Link href={`/post/${post.id}`}>
        <a className="text-lg">{post.title}</a>
      </Link>
      <Link href={`/post/${post.id}`}>
        <p
          className="text-sm pr-5 pb-2 line-clamp-3 cursor-pointer"
          style={{ width: 600 }}
        >
          {post.content}
        </p>
      </Link>
      <Link href={`/post/${post.id}`}>
        <a className="bg-gray-200 p-1 text-sm text-gray-700">
          {post.comments.length} comments
        </a>
      </Link>
    </div>
  );
}

export default PostCard;

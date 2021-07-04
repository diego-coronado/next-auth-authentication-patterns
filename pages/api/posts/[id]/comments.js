import { getPostComments } from "../../../../db/comment";
import prisma from "../../../../db/connect";

export default async function handler(req, res) {
  const { body, method } = req;
  try {
    switch (method) {
      case "GET": {
        const comments = await getPostComments(prisma, body.postId);
        // console.log(comments);
        res.send({ data: comments });
        break;
      }
      default: {
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (err) {
    res.status(505);
    console.log(err);
  }
}

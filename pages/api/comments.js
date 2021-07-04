import prisma from "../../db/connect";
import { createComment } from "../../db/comment";

export default async function handler(req, res) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const comment = await createComment(
          prisma,
          body.content,
          body.userId,
          body.postId
        );
        res.send({ data: comment });
        break;
      }
      default: {
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (err) {
    res.status(505)
    console.log(err);
  }
}

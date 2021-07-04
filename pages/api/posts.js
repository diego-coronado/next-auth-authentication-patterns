import prisma from "../../db/connect";
import { createPost } from "../../db/post";

export default async function handler(req, res) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const post = await createPost(
          prisma,
          body.title,
          body.description,
          body.userId
        );
        res.send({ data: post });
        break;
      }
      case "PATCH": {
        break;
      }
      default: {
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

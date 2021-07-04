export const createComment = async (prisma, content, userId, postId) => {
  return await prisma.comments.create({
    data: {
      content,
      authorId: userId,
      postId,
    },
  });
};

export const getPostComments = async (prisma, postId) => {
  return await prisma.comments.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

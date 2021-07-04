export const allPosts = async (prisma) => {
  return await prisma.posts.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: { id: true },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
};

export const allPostsByUser = async (prisma, userId) => {
  return await prisma.posts.findMany({
    where: {
      authorId: userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: { id: true },
      },
    },
  });
};

export const getPost = async (prisma, id) => {
  return await prisma.posts.findUnique({
    where: {
      id: id,
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

export const createPost = async (prisma, title, content, userId) => {
  return await prisma.posts.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });
};

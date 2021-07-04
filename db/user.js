export const getUser = async (prisma, id) => {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

import { prisma } from "../../utils";

const verifyUserExists = async (email?: string, username?: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: email,
          },
        },
        {
          username: {
            equals: username,
          },
        },
      ],
    },
  });

  if (!user) {
    return {
      found: false,
    };
  }
  return {
    found: true,
    user,
  };
};

export default verifyUserExists;

import { prisma } from "../../utils";

interface CreateUserProps {
  email: string;
  username: string;
  password: string;
}

const createUser = async (data: CreateUserProps) => {
  // Create the user
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password,
    },
  });

  return newUser;
};

export default createUser;

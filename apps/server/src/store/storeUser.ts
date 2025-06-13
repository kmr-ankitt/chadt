import prisma from "../config/prisma";

export async function createUser({
  sender,
  senderName,
  senderProfilePicture
}: {
  sender: string;
  senderName: string;
  senderProfilePicture: string;
}) {
  const newUser = await prisma.user.create({
    data: {
      userId: sender,
      name: senderName,
      pfp: senderProfilePicture
    }
  })
  console.log(`User created: ${sender} with name ${senderName}`);
}
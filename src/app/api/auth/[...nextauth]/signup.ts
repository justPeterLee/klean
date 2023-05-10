import { encryptPassword } from "../../../../../lib/encrypt";
import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";
export default async function POST(req: any) {
  const { first, last, email, password } = req.body as {
    first: string;
    last: string;
    email: string;
    password: string;
  };

  const hashedPassword = await encryptPassword(password);

  await signIn(first, last, email, hashedPassword)
    .then(async () => {
      await prisma.$disconnect();
      return NextResponse.json({ status: 201 });
    })
    .catch(async (e) => {
      console.error("Error with creating user: ", e);
      await prisma.$disconnect();
      return NextResponse.json({ status: 500 });
      process.exit(1);
    });
}

async function signIn(
  first: string,
  last: string,
  email: string,
  password: string
) {
  await isUnique(email);
  //   await prisma.$connect();
  await prisma.user.create({
    data: {
      user_name: first,
      user_last: last,
      email: email,
      password: password,
    },
  });
}

async function isUnique(email: string) {
  const allUsers = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  //  console.log(allUsers);

  if (allUsers) {
    //throw error
  } else {
    console.log("no user");
  }
}

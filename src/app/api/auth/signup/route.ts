import { encryptPassword } from "../../../../../lib/encrypt";
import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const { first, last, email, password } = data;

  const hashedPassword = await encryptPassword(password);

  // interface MyResponse {
  //   status: number;
  // }

  const credSign = await signIn(first, last, email, hashedPassword)
    .then(async () => {
      await prisma.$disconnect();
      return new NextResponse(JSON.stringify({ status: 200 }), {
        headers: { "content-type": "application/json" },
      });
    })
    .catch(async (e) => {
      console.error("Error with creating user: ", e);
      await prisma.$disconnect();
      return new NextResponse(JSON.stringify({ status: 500 }), {
        headers: { "content-type": "application/json" },
      });
      process.exit(1);
    });

  await prisma.$disconnect();

  return credSign;
}

async function signIn(
  first: string,
  last: string,
  email: string,
  password: string
) {
  const isUniqueEmail = await isUnique(email);
  //   await prisma.$connect();

  if (isUniqueEmail) {
    await prisma.user.create({
      data: {
        user_name: first,
        user_last: last,
        email: email,
        password: password,
      },
    });
  } else {
    throw new Error("User already exists");
  }
}

async function isUnique(email: string) {
  const allUsers = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  //  console.log(allUsers);

  if (allUsers) {
    return false;
  } else {
    return true;
  }
}

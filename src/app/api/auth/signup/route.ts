import { encryptPassword } from "../../../../../lib/encrypt";
import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const data = await req.json();
    const { first, last, email, password } = data;

    const hashedPassword = await encryptPassword(password);

    const isUniqueEmail = await isUnique(email);

    if (isUniqueEmail) {
      await prisma.user.create({
        data: {
          user_name: first,
          user_last: last,
          email: email,
          password: hashedPassword,
        },
      });

      await prisma.$disconnect();

      return new NextResponse(
        JSON.stringify({ message: "User created successfully" }),
        { status: 201, headers: { "content-type": "application/json" } }
      );
    } else {
      await prisma.$disconnect();

      return new NextResponse(
        JSON.stringify({ error: "Email already exists" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
  } catch (error) {
    await prisma.$disconnect();
    console.error("Error creating user:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

async function isUnique(email: string) {
  const user = await prisma.user.findFirst({ where: { email: email } });
  return !user;
}

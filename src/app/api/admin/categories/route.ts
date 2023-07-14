import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
export async function GET() {
  //   const request = req;
  const categories = await prisma.category.findMany();

  console.log(categories);
  return new NextResponse(JSON.stringify(categories), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: any) {
  const newCat = await req.json();

  await prisma.category
    .create({
      data: { category_name: newCat },
    })
    .then(() => {
      return new NextResponse(
        JSON.stringify({ message: "User created successfully", status: 200 }),
        { status: 201, headers: { "content-type": "application/json" } }
      );
    })
    .catch((err) => {
      return new NextResponse(JSON.stringify({ message: err, status: 500 }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    });

  return new NextResponse(
    JSON.stringify({ message: "User created successfully", status: 200 }),
    { status: 201, headers: { "content-type": "application/json" } }
  );
}

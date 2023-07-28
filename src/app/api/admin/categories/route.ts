import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
export async function GET() {
  //   const request = req;
  const categories = await prisma.category.findMany();

  return new NextResponse(JSON.stringify(categories), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: any) {
  const newCat = await req.json();
  let name = newCat.toLowerCase();
  if (name.includes(" ")) {
    name = name.split(" ").join("-");
  }
  const res = await prisma.category.create({
    data: { category_name: name, category_description: newCat },
  });

  return new NextResponse(JSON.stringify({ created: res, status: 200 }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
}

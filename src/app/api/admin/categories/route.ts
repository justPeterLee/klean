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

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //   const request = req;
  return new NextResponse(JSON.stringify({ hello: "world" }), {
    headers: { "content-type": "application/json" },
  });
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any) {
  return new NextResponse(JSON.stringify({ hello: "world" }), {
    headers: { "content-type": "application/json" },
  });
}

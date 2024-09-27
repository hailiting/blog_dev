import { NextRequest, NextResponse } from "next/server";
export function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return NextResponse.json({ id: id });
}

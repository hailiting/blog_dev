import { NextRequest, NextResponse } from "next/server";
// 拿到所有params
export function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return NextResponse.json({ id: id });
}

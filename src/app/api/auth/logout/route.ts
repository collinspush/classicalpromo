import { NextResponse } from "next/server";
import { assertSameOrigin } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
  } catch {
    return NextResponse.json({ error: "Cross-origin request blocked" }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set("cp_session", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}

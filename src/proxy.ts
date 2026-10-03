import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";
import { authSecret } from "@/lib/secret";
import { readDb } from "@/lib/store";

async function roleOf(request: NextRequest) {
  const token = request.cookies.get("cp_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, authSecret());
    const userId = payload.sub;
    if (!userId) return null;
    const user = (await readDb()).users.find((item) => item.id === userId);
    if (!user || user.tokenVersion !== payload.tv) return null;
    return { role: user.role };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) return NextResponse.next();

  try {
    const redirects = (await readDb()).redirects;
    const match = redirects.find((item) => item.status === "active" && item.oldUrl === pathname);
    if (match) {
      return NextResponse.redirect(new URL(match.newUrl, request.url), match.type === 302 ? 302 : 301);
    }
  } catch {
    // A missing database should not turn every public URL into a redirect loop.
  }

  const session = await roleOf(request);
  if (pathname.startsWith("/admin") && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL(session ? "/dashboard" : `/login?next=${pathname}`, request.url));
  }
  if (pathname.startsWith("/partner") && session?.role !== "PARTNER") {
    return NextResponse.redirect(new URL(session ? "/dashboard" : `/login?next=${pathname}`, request.url));
  }
  if ((pathname.startsWith("/dashboard") || pathname.startsWith("/checkout")) && !session) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url));
  }
  if (pathname.startsWith("/dashboard") && session?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (pathname.startsWith("/dashboard") && session?.role === "PARTNER") {
    return NextResponse.redirect(new URL("/partner", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};

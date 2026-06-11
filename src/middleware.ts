import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;


  if (!token && !refreshToken) {
    const isProtected = request.nextUrl.pathname.startsWith("/ownerAccount") ||
      request.nextUrl.pathname.startsWith("/adminAccount") ||
      request.nextUrl.pathname.startsWith("/customerAccount");

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // لو في refreshToken بس مفيش token — اعمل refresh
  if (!token && refreshToken) {
    const res = await fetch(
      "https://graduationprojectclean-production.up.railway.app/api/Auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!res.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      response.cookies.delete("refreshToken");
      return response;
    }

    const data = await res.json();

    if (data.isSuccess) {
      const response = NextResponse.next();
      response.cookies.set("token", data.token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
      response.cookies.set("refreshToken", data.refreshToken, { maxAge: 7 * 24 * 60 * 60, httpOnly: false });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/ownerAccount/:path*",
    "/adminAccount/:path*",
    "/customerAccount/:path*",
  ],
};
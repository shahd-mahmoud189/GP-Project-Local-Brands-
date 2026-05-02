import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  let refreshToken: string | undefined;

  try {
    const body = await request.json();
    console.log("Body received:", body);
    refreshToken = body.refreshToken;
  } catch (e) {
    console.log("Body parse error:", e);
    return NextResponse.json({ success: false, message: "Invalid body" }, { status: 400 });
  }

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: "Missing tokens" }, { status: 401 });
  }

  const res = await fetch(
    "https://brands-system-production-c110.up.railway.app/api/Auth/refresh-token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
    }
  );

  console.log("Railway response status:", res.status);
  const data = await res.json();
  console.log("Railway response data:", data);

  if (!res.ok || !data.isSuccess) {
  const response = NextResponse.json({ success: false }, { status: 401 });
  // امسح الكوكيز القديمة
  response.cookies.delete("token");
  response.cookies.delete("refreshToken");
  response.cookies.delete("email");
  response.cookies.delete("userType");
  return response;
}

  const cookieStore = await cookies();
  cookieStore.set("token", data.token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
  cookieStore.set("refreshToken", data.refreshToken, { maxAge: 7 * 24 * 60 * 60, httpOnly: false });

  return NextResponse.json({ success: true, token: data.token });
}
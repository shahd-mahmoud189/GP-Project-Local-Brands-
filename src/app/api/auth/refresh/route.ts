import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!token || !refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = await fetch(
    "https://brands-system-production-c110.up.railway.app/api/Auth/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Token: token, RefreshToken: refreshToken }),
    }
  );

  if (!res.ok) return NextResponse.json({ success: false }, { status: 401 });

  const data = await res.json();

  if (!data.isSuccess) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // هنا بنعمل set صح لأنه Route Handler
  const response = NextResponse.json({ success: true, token: data.token });
  response.cookies.set("token", data.token, { maxAge: 1 * 24 * 60 * 60 , httpOnly: false});
  response.cookies.set("refreshToken", data.refreshToken, { maxAge: 7 * 24 * 60 * 60 , httpOnly: false});

  return response;
}
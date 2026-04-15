"use server";
import { cookies } from "next/headers";

export async function setTokens(token: string, refreshToken: string): Promise<void> {
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60,
  });
  cookie.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function setUserInfo(email: string, userType: string): Promise<void> {
  const cookie = await cookies();
  cookie.set("email", email);
  cookie.set("userType", userType);
}

export async function getTokens(): Promise<object | null> {
  const cookie = await cookies();
  return {
    token: cookie.get("token")?.value || null,
    refreshToken: cookie.get("refreshToken")?.value || null,
  };
}

export async function removeTokens(): Promise<void> {
  const cookie = await cookies();
  cookie.delete("token");
  cookie.delete("refreshToken");
}

export async function removeUserInfo(): Promise<void> {
  const cookie = await cookies();
  cookie.delete("email");
  cookie.delete("userType");
}

export async function getAuthData() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  const email = cookie.get("email")?.value;
  const userType = cookie.get("userType")?.value;

  if (token) {
    return {
      isAuthinticated: true,
      userInfo: { email: email || "", userType: userType || "" },
    };
  }
  return null;
}

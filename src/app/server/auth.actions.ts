"use server";
import { cookies } from "next/headers";

export async function setTokens(token: string, refreshToken: string): Promise<void> {
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: false,
    maxAge: 1 * 24 * 60 * 60,
  });
  cookie.set("refreshToken", refreshToken, {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function setUserInfo(email: string, userType: string): Promise<void> {
  const cookie = await cookies();
  cookie.set("email", email, { maxAge: 1 * 24 * 60 * 60 });
  cookie.set("userType", userType, { maxAge: 1 * 24 * 60 * 60 });
}

export async function setBrandRequest(requestStatusText: string, requestDate: string): Promise<void> {
  const cookie = await cookies();
  cookie.set("requestStatusText", requestStatusText);
  cookie.set("requestDate", requestDate);
}

export async function removeBrandRequest(): Promise<void> {
  const cookie = await cookies();
  cookie.delete("requestStatusText");
  cookie.delete("requestDate");
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

// export async function getBrandRequest() {
//   const cookie = await cookies();
//   const token = cookie.get("token")?.value;
//   const requestStatusText = cookie.get("requestStatusText")?.value;
//   const requestDate = cookie.get("requestDate")?.value;

//   if (token) {
//     return {
//       requestStatusText: requestStatusText || "",
//       requestDate: requestDate || ""
//     };
//   }
//   return null;
// }


export async function getMyRequestData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // لو مفيش توكن، نرجع قيم فاضية فوراً وممنوع نبعت طلب للسيرفر
  if (!token) {
    return { requestStatusText: "", requestDate: "" };
  }

  try {
    // بنستخدم fetch العادي هنا عشان نهرب من مشاكل Axios في السيرفر
    const response = await fetch('https://graduationprojectclean-production.up.railway.app/api/BrandOwnerRequest/my-requests', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store' // مهم جداً عشان الداتا متتحفظش قديمة
    });

    if (!response.ok) return { requestStatusText: "", requestDate: "" };

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return {
        requestStatusText: data[0].requestStatusText || "",
        requestDate: data[0].requestDate || "",
      };
    }
    
    return { requestStatusText: "", requestDate: "" };
  } catch (error) {
    return { requestStatusText: "", requestDate: "" };
  }
}


'use server'
import { cookies } from 'next/headers';

export async function setTokenInCookies(token:string):Promise<void>{
    const cookie = await cookies()
        cookie.set('token', token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60
    })
}

export async function setRefreshTokenInCookies(refreshToken: string): Promise<void> {
  const cookie = await cookies();

  cookie.set('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60
  });
}

export async function setEmail(email:string):Promise<void>{
    const cookie = await cookies()
        cookie.set('email', email)
}

export async function setUserType(userType:string):Promise<void>{
    const cookie = await cookies()
        cookie.set('userType', userType)
}

export async function getToken():Promise<string|null>{
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    return token
}

export async function removeFromCookie(name:string):Promise<void>{
    const cookie = await cookies()
    cookie.delete(name)
}

// cookies.ts (أو ملف الـ actions بتاعك)
export async function getAuthData() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const email = cookieStore.get('email')?.value; // يفضل تخزني الايميل والنوع برضه
    const userType = cookieStore.get('userType')?.value;

    if (token) {
        return {
            isAuthinticated: true,
            userInfo: { email: email || '', userType: userType || '' }
        };
    }
    return null;
}
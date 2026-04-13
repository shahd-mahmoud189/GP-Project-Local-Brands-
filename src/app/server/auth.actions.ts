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
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60
  });
}

export async function getToken():Promise<string|null>{
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    return token
}

export async function removeToken(tokenName:string):Promise<void>{
    const cookie = await cookies()
    cookie.delete(tokenName)
}
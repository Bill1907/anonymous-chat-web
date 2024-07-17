import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const url = process.env.API_URL;

    const searchParams = request.nextUrl.searchParams
    const nickname = searchParams.get('nickname')

    const res = await fetch(`${url}/user/account/nick-name/validate?nickName=${nickname}`)
    return Response.json({ isValid : !!res.ok });

}
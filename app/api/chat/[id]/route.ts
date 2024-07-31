import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string }}) {

    const id = params.id;
    // 모든 헤더를 로그로 출력
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const data = await request.json()

    try {
        const body = {
            content: data.message,
            contentType: "CHAT"
        }

        console.log(body);

        const res = await fetch(`${process.env.API_URL}/user/chat-room/${id}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${token}`,
            },
            body: JSON.stringify(body),
        })

        console.log(res);

        return Response.json({ success: res.ok });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}
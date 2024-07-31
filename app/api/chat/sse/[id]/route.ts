import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  // 모든 헤더를 로그로 출력
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/user/chat-room/${id}/connect`, {
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'SSE connection failed' }, { status: response.status });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('SSE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
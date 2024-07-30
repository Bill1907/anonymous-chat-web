
export async function POST(request: Request) {

    const url = process.env.API_URL;

    const { nickname } = await request.json()
    
    const res = await fetch(`${url}/user/account/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickName: nickname }),
    })
    
    if(res.ok) {
        const { token } = await res.json()
        return Response.json({ token });
    } else {
        console.log('here??/')
        return Response.error();
    }
}
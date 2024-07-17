export async function GET(request: Request) {
    const url = process.env.API_URL;
    const res = await fetch(`${url}/dev/ping`)

    if(res.ok) {
        return Response.json({ message: "Ping OK" });
    }
    return Response.json({ message: "Ping Not OK" });
} 
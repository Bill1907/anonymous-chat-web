import LoginForm from "@/components/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const checkPing = async () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${url}/api/ping`);
  return await res.json()
}

export default async function Home() {
  const { message } = await checkPing();
  console.log(message);
  return (
    <main className="flex min-h-screen w-full justify-center items-center p-24">
      <Card className="sm:w-96 lg:w-1/3">
        <CardHeader>채팅방 입장 </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}

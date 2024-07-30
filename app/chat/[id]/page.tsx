import ChatRoom from "@/components/chat-room";


export default function Page({ params }: { params: { id: string } }) {
    return (
    <main className="flex min-h-screen w-full justify-center items-center p-24">
        <ChatRoom chatRoomId={params.id} />
    </main>
    );
  }
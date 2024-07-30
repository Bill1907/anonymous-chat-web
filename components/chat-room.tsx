import ChatListSse from "./chat-list-sse"
import { Card, CardContent, CardHeader } from "./ui/card"

type ChatRoomProps = {
    chatRoomId: string
}

export default function ChatRoom({ chatRoomId }: ChatRoomProps) {
    return (
        <main className="flex min-h-screen w-full justify-center items-center p-24">
            <Card>
                <CardHeader>
                    Chat Room: {chatRoomId}
                </CardHeader>
                <CardContent>
                    <ChatListSse chatRoomId={chatRoomId} />
                </CardContent>
            </Card>
        </main>
    )
}
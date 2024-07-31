import ChatInput from "./chat-input"
import ChatListSse from "./chat-list-sse"
import { Card, CardContent, CardHeader } from "./ui/card"

type ChatRoomProps = {
    chatRoomId: string
}

export default function ChatRoom({ chatRoomId }: ChatRoomProps) {
    return (
        <Card className="sm:w-96 lg:w-1/3">
            <CardHeader>
                Chat Room: {chatRoomId}
            </CardHeader>
            <CardContent>
                <ChatListSse chatRoomId={chatRoomId} />
                <ChatInput id={chatRoomId}/>
            </CardContent>
        </Card>
    )
}
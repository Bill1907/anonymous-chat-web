'use client'

import { useState, useEffect } from 'react';

interface ChatListSseProps {
  chatRoomId: string;
}

export default function ChatListSse({chatRoomId}: ChatListSseProps) {
    const [chatList, setChatList] = useState<string[]>([]);

    useEffect(() => {
        const eventSource = new EventSource(`/api/chat/sse/${chatRoomId}`);
        
        eventSource.onmessage = (event) => {
            console.log('SSE message:', event.data);
            setChatList(event.data);
        };
    
        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            eventSource.close();
        };
  
        return () => eventSource.close();
    }, [chatRoomId]);
  

    return (
        <div>
         HelloWorld
        </div>
    );
}
import { useCallback, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

export function useWebSocketWithPing(
    url: string | (() => string | Promise<string>) | null
) {
    const { sendMessage, lastMessage, readyState } = useWebSocket(url, {
        onOpen: () => console.log('WebSocket соединение открыто'),
        onClose: () => console.log('WebSocket соединение закрыто'),
        onError: (event) => console.error('WebSocket ошибка:', event),
        shouldReconnect: () => true,
    })

    const sendPong = useCallback(() => {
        sendMessage('pong')
    }, [sendMessage])

    useEffect(() => {
        if (lastMessage?.data === 'ping') {
            sendPong()
        }
    }, [lastMessage, sendPong])

    return { sendMessage, lastMessage, readyState }
}

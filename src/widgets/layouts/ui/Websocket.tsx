import { useEffect, useState } from 'react'
import { useHrUserInfo } from '@/entities/hrCard'
import { useWebSocketStore } from '@/entities/websocket'
import { getToken } from '@/shared/config/storage'
import { useWebSocketWithPing } from '@/shared/lib/websocket'

export const Websocket = () => {
    const setWebSocketState = useWebSocketStore(
        (state) => state.setWebSocketState
    )

    const id = useHrUserInfo((state) => state.id)
    const token = getToken()
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        if (id && token) {
            setIsReady(true)
        }
    }, [id, token])

    const { sendMessage, lastMessage, readyState } = useWebSocketWithPing(
        isReady
            ? `wss://hrhub.pixel-team.ru/ws/user/${id}/messages/?token=${token}`
            : null
    )

    useEffect(() => {
        if (isReady) {
            setWebSocketState({ sendMessage, lastMessage, readyState })
        }
    }, [sendMessage, lastMessage, readyState, setWebSocketState, isReady])

    return <></>
}

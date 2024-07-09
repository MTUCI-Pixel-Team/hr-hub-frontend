import { ReadyState, SendMessage } from 'react-use-websocket'
import { create } from 'zustand'

// interface WebSocketState {
//     isConnected: boolean
//     lastMessage: any | null
//     connect: (id: number, token: string) => void
//     disconnect: () => void
//     send: (message: string) => void
// }

// export const useWebSocketStore = create<WebSocketState>((set) => ({
//     isConnected: false,
//     lastMessage: null,
//     connect: (id, token) => {
//         websocketManager.connect(id, token)
//         websocketManager.setMessageHandler((message) => {
//             set({ lastMessage: message })
//         })
//         set({ isConnected: true })
//     },
//     disconnect: () => {
//         websocketManager.disconnect()
//         set({ isConnected: false, lastMessage: null })
//     },
//     send: (message) => {
//         websocketManager.send(message)
//     },
// }))

// return { sendMessage, lastMessage, readyState }

interface WebSocketState {
    readyState: ReadyState
    sendMessage: SendMessage
    lastMessage: MessageEvent | null
    setWebSocketState: (state: Partial<WebSocketState>) => void
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
    sendMessage: () => {},
    lastMessage: null,
    readyState: -1,
    setWebSocketState: (state) => set(state),
}))

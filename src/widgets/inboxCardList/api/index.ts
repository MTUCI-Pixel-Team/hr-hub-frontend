import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useWebSocketStore } from '@/entities/websocket'
import { Api } from '@/shared/api'
import { IMessageResponse } from '../model'

export const useGetAllMessage = () => {
    const queryClient = useQueryClient()
    const { lastMessage, readyState } = useWebSocketStore()

    const query = useInfiniteQuery({
        queryKey: ['messages'],
        queryFn: ({ pageParam }) => {
            return Api.getWithToken<IMessageResponse>(
                `message/list/?page=${pageParam}`
            )
        },
        enabled: readyState === WebSocket.OPEN,
        initialPageParam: '1',
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]
            return nextPage
        },
    })

    useEffect(() => {
        if (lastMessage && lastMessage.data !== 'ping') {
            try {
                const newMessage = JSON.parse(lastMessage.data)
                queryClient.setQueryData(['messages'], (oldData: any) => {
                    // Проверяем, существует ли oldData и есть ли в нем pages
                    if (!oldData || !oldData.pages) return oldData

                    // Создаем копию старых данных
                    const newData = JSON.parse(JSON.stringify(oldData))

                    // Добавляем новое сообщение в начало первой страницы
                    if (newMessage.message !== 'OK') {
                        newData.pages[0].results = [
                            newMessage.message,
                            ...newData.pages[0].results,
                        ]
                    }

                    return newData
                })
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
            }
        }
    }, [lastMessage, queryClient])

    return {
        ...query,
        isConnected: readyState === WebSocket.OPEN,
    }
}

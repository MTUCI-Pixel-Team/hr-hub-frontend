import { type ClassValue, clsx } from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getPlatform = (chatLink: string) => {
    const extractDomain = (url: string): string => {
        const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
        return (matches && matches[1]) || ''
    }

    const getSocialNetwork = (
        domain: string
    ):
        | {
              name: string
              color: string
          }
        | undefined => {
        const domainMap: {
            [key: string]: {
                name: string
                color: string
            }
        } = {
            'mail.yandex.ru': {
                name: 'Yandex Почта',
                color: 'text-red-400',
            },
            'web.telegram.org': {
                name: 'Telegram',
                color: 'text-blue-400',
            },
            'avito.ru': {
                name: 'Avito',
                color: 'text-green-400',
            },
        }

        return domainMap[domain]
    }

    const domain = extractDomain(chatLink)
    return getSocialNetwork(domain)
}

type MessagesTypes = 'delete' | 'success' | 'update' | 'error'

type Messages = {
    delete: string
    success: string
    update: string
    error: string
}

// Определяем тип для аргументов функции
type SetMessageArgs = {
    message: string
    type: MessagesTypes
    setMessages: Dispatch<SetStateAction<Messages>>
}

// Типизированная функция
export const setStatusMessage = ({
    message,
    type,
    setMessages,
}: SetMessageArgs): void => {
    setMessages((prev) => ({
        ...prev,
        [type]: message,
    }))

    setTimeout(() => {
        setMessages((prev) => ({
            ...prev,
            [type]: '',
        }))
    }, 3000)
}

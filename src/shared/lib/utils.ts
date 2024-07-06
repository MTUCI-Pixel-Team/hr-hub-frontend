import { type ClassValue, clsx } from 'clsx'
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

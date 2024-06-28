import { FC, HTMLAttributes } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

interface DefaultCardProps extends HTMLAttributes<HTMLDivElement> {
    inbox?: boolean | undefined
    name: string
    username?: string
    platform?: string
    profession?: string
    date?: string
    unreadMessages?: number
    text?: string
}

export const DefaultCard: FC<DefaultCardProps> = ({
    name,
    username,
    platform,
    inbox,
    profession,
    date,
    unreadMessages,
    text,
    ...props
}) => {
    return (
        <div className='bg-card rounded-md shadow-sm relative' {...props}>
            <div className='flex items-start gap-4 p-4'>
                <Avatar className='w-10 h-10 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                    <div className='flex items-center flex-wrap justify-between'>
                        <div className='flex gap-2'>
                            <div className='font-medium'>{name}</div>
                            {inbox ? (
                                <>
                                    <div className='font-small text-muted-foreground'>
                                        {username}
                                    </div>
                                    <div className='font-small text-blue-500'>
                                        {platform}
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                            {!inbox ? profession : date}
                        </div>
                    </div>

                    <p className='text-muted-foreground'>
                        {inbox
                            ? text
                            : `${unreadMessages} непрочитанных сообщений`}
                    </p>
                </div>
            </div>
        </div>
    )
}

import { FC } from 'react'
import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'

interface DefaultCardProps {
    inbox?: boolean | undefined
    // name: string
    className?: string
    from_username?: string
    platform?:
        | {
              name: string
              color: string
          }
        | undefined
    profession?: string
    groupName?: string
    userId?: number
    received_at?: string
    unreadMessages?: number
    personalChatLink?: string
    text?: string
}

export const DefaultCard: FC<DefaultCardProps> = ({
    // name,
    className,
    platform,
    inbox,
    profession,
    received_at,
    unreadMessages,
    personalChatLink,
    groupName,
    text,
    ...props
}) => {
    return (
        <div
            className={cn('bg-card rounded-md relative', className)}
            {...props}>
            <div className='flex items-center gap-4 p-4'>
                <Avatar className='w-10 h-10 border'>
                    {/* <AvatarImage src='/placeholder-user.jpg' /> */}
                    <AvatarFallback className='text-gray-900'>
                        {groupName?.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className='flex-1 w-full'>
                    <div className='flex items-center flex-wrap justify-between'>
                        <div className='flex gap-2 flex-wrap '>
                            <div className='font-medium '>{groupName}</div>
                            {inbox ? (
                                <>
                                    <a target='_blank' href={personalChatLink}>
                                        <Button
                                            className={`p-0 m-0 h-auto font-small ${platform?.color}`}
                                            variant={'link'}>
                                            {platform?.name}
                                        </Button>
                                    </a>
                                </>
                            ) : null}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                            {!inbox
                                ? profession
                                : new Date(received_at || '').toLocaleString()}
                        </div>
                    </div>

                    <p className='text-muted-foreground'>
                        {inbox
                            ? text
                            : unreadMessages
                            ? `${unreadMessages} непрочитанных сообщений`
                            : 'Нет новых сообщений'}
                    </p>
                </div>
            </div>
        </div>
    )
}

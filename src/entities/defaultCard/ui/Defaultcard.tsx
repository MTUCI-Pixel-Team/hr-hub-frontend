import { FC, HTMLAttributes } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

interface DefaultCardProps extends HTMLAttributes<HTMLDivElement> {
    inbox?: boolean | undefined
    // name: string
    from_username?: string
    platform?:
        | {
              name: string
              color: string
          }
        | undefined
    profession?: string
    received_at?: string
    unreadMessages?: number
    text?: string
}

export const DefaultCard: FC<DefaultCardProps> = ({
    // name,
    from_username,
    platform,
    inbox,
    profession,
    received_at,
    unreadMessages,
    text,
    ...props
}) => {
    return (
        <div className='bg-card rounded-md shadow-sm relative' {...props}>
            <div className='flex items-start gap-4 p-4'>
                <Avatar className='w-10 h-10 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>
                        {from_username?.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className='flex-1 w-full'>
                    <div className='flex items-center flex-wrap justify-between'>
                        <div className='flex gap-2 flex-wrap'>
                            <div className='font-medium'>{from_username}</div>
                            {inbox ? (
                                <>
                                    {/* <div className='font-small text-muted-foreground'>
                                        {from_username}
                                    </div> */}
                                    <div
                                        className={`font-small text-muted-foreground ${platform?.color}`}>
                                        {platform?.name}
                                    </div>
                                    {/* <div className='font-small text-blue-500'>
                                        {platform}
                                    </div> */}
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
                            : `${unreadMessages} непрочитанных сообщений`}
                    </p>
                </div>
            </div>
        </div>
    )
}

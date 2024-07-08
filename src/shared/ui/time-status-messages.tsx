import { FC } from 'react'
import { FormMessage } from './form'

interface TimeMessagesProps {
    messages: {
        error: string
        success: string
        update: string
        delete: string
    }
}

export const TimeStatusMessages: FC<TimeMessagesProps> = ({ messages }) => {
    return (
        <div className='text-muted-foreground'>
            {messages.delete && <p>{messages.delete}</p>}

            {messages.error && <FormMessage>{messages.error}</FormMessage>}

            {messages.success && <p>{messages.success}</p>}

            {messages.update && <p>{messages.update}</p>}
        </div>
    )
}

import React from 'react'
import { MessageCard } from '@/entities/messageCard'

export const MessagesCardList = () => {
    return (
        <div className='flex-1 overflow-y-scroll'>
            <div className='grid gap-4 p-6'>
                {new Array(10).fill(0).map((_, index) => (
                    <MessageCard key={index} />
                ))}
            </div>
        </div>
    )
}

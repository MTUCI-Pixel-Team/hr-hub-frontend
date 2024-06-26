import React from 'react'
import { Header } from '@/widgets/header'
import { MessagesCardList } from '@/widgets/messagesCardList'
import { Button } from '@/shared/ui/button'

export const Home = () => {
    return (
        <>
            <Header />
            <MessagesCardList />
        </>
    )
}

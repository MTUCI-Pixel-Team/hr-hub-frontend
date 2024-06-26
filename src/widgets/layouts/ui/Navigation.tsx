import { InboxIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/shared/ui/button'

export const Navigation = () => {
    return (
        <nav className='flex flex-col gap-2'>
            <Button variant='ghost' className='justify-start gap-2 w-full'>
                <InboxIcon className='w-4 h-4' />
                Входящие
                <div className='ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium'>
                    3
                </div>
            </Button>
            <Button variant='ghost' className='justify-start gap-2 w-full'>
                <UsersIcon className='w-4 h-4' />
                Люди
            </Button>
            <Button variant='ghost' className='justify-start gap-2 w-full'>
                <SettingsIcon className='w-4 h-4' />
                Настройки
            </Button>
        </nav>
    )
}

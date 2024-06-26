import { Outlet } from 'react-router-dom'
import { HrCard } from '@/entities/hrCard'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { Navigation } from './Navigation'

export const Layout = () => {
    return (
        <div className='flex w-full'>
            <div className='h-screen bg-background border-r border-muted flex flex-col gap-4 p-4 w-60'>
                <Logo />
                <Navigation />

                <div className='bg-card rounded-md shadow-sm p-4 flex flex-col gap-4 mt-auto'>
                    <HrCard />
                    <Button variant='outline' className='w-full'>
                        Выйти
                    </Button>
                </div>
            </div>
            <div className='flex-1 flex flex-col h-screen'>
                <Outlet />
            </div>
        </div>
    )
}

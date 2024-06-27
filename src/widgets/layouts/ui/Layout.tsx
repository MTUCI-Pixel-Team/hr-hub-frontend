import { Link, Outlet } from 'react-router-dom'
import { HrCard } from '@/entities/hrCard'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { Navigation } from './Navigation'

export const Layout = () => {
    return (
        <div className='flex w-full'>
            <div className='h-screen bg-background border-r border-muted flex flex-col gap-4 p-4 w-60'>
                <Link
                    className='transition-all duration-300 hover:scale-[102%]'
                    to='/'>
                    <Logo />
                </Link>
                <Navigation />

                <div className='bg-card rounded-md shadow-sm p-4 flex flex-col gap-4 mt-auto'>
                    <HrCard />
                    <Link to='auth/login'>
                        <Button
                            variant='outline'
                            className='w-full transition-all duration-300 hover:scale-[105%]'>
                            Выйти
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='flex-1 flex flex-col h-screen '>
                <Outlet />
            </div>
        </div>
    )
}

export const LayoutAuth = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-full'>
            <Outlet />
            <div className='hidden md:flex bg-muted items-center justify-center '>
                <Link
                    to={'/'}
                    className='w-[70%] p-16 rounded-3xl bg-primary transition-all duration-300 hover:scale-[102%]'>
                    <Logo className='w-full filter invert' />
                </Link>
            </div>
        </div>
    )
}

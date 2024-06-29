import { XCircle } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import { HrCard } from '@/entities/hrCard'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { useLayoutStore } from '../models'
import { Navigation } from './Navigation'

export const Layout = () => {
    const menu = useLayoutStore((state) => state.menu)
    const setMenu = useLayoutStore((state) => state.setMenu)

    return (
        <div className='flex'>
            <div
                className={`md:visible md:flex h-screen bg-background border-r border-muted ${
                    menu ? 'flex translate-x-0' : 'max-sm:-translate-x-full'
                } flex-col gap-4 p-4 w-60 max-sm:w-full max-sm:absolute max-sm:z-10 transition-transform duration-300`}>
                <Button
                    size={'sm'}
                    variant={'outline'}
                    className={`${
                        menu ? 'flex' : 'hidden'
                    } w-12 h-12 absolute top-2 right-2  items-center justify-center`}
                    onClick={() => setMenu(!menu)}>
                    <XCircle />
                </Button>
                <Link
                    onClick={() => setMenu(false)}
                    className='w-[90%] transition-all duration-300 hover:scale-[102%]'
                    to='/'>
                    <Logo />
                </Link>
                <Navigation />

                <div className='bg-card rounded-md shadow-sm p-4 flex flex-col gap-4 mt-auto'>
                    <HrCard onClick={() => setMenu(false)} />
                    <Link to='auth/login' onClick={() => setMenu(false)}>
                        <Button
                            variant='outline'
                            className='w-full transition-all duration-300 hover:scale-[105%]'>
                            Выйти
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='flex-1 flex flex-col h-screen'>
                <Outlet />
            </div>
        </div>
    )
}

export const LayoutAuth = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-full'>
            <Outlet />
            <div className='flex p-16 max-sm:rounded-t-3xl md:rounded-l-3xl bg-primary items-center justify-center '>
                <Link
                    to={'/'}
                    className='w-[90%] transition-all duration-300 hover:scale-[102%]'>
                    <Logo className='w-full filter invert' />
                </Link>
            </div>
        </div>
    )
}

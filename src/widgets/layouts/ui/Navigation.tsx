import classNames from 'classnames'
import { InboxIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { useLayoutStore } from '../models'

export const Navigation = () => {
    const setMenu = useLayoutStore((state) => state.setMenu)

    return (
        <nav className='flex flex-col gap-2 text-black'>
            <NavLink to='/' onClick={() => setMenu(false)}>
                {({ isActive }) => {
                    return (
                        <Button
                            variant='ghost'
                            className={classNames(
                                'justify-start gap-2 w-full group hover:scale-[102%] transition-all duration-300',
                                {
                                    'bg-primary text-primary-foreground':
                                        isActive,
                                }
                            )}>
                            <InboxIcon className='w-4 h-4' />
                            Входящие
                            {/* <div
                                className={classNames(
                                    'ml-auto flex h-5 w-5 items-center  justify-center rounded-full bg-primary text-xs font-medium group-hover:bg-black group-hover:text-white transition-colors',
                                    {
                                        'text-black bg-secondary': isActive,
                                        'text-white': !isActive,
                                    }
                                )}>
                                3
                            </div> */}
                        </Button>
                    )
                }}
            </NavLink>
            <NavLink to='/peoples' onClick={() => setMenu(false)}>
                {({ isActive }) => {
                    return (
                        <Button
                            variant='ghost'
                            className={classNames(
                                'justify-start gap-2 w-full hover:scale-[102%] transition-all duration-300',
                                {
                                    'bg-primary text-primary-foreground':
                                        isActive,
                                }
                            )}>
                            <UsersIcon className='w-4 h-4' />
                            Люди
                        </Button>
                    )
                }}
            </NavLink>
            <NavLink to='/settings' onClick={() => setMenu(false)}>
                {({ isActive }) => {
                    return (
                        <Button
                            variant='ghost'
                            className={classNames(
                                'justify-start gap-2 w-full hover:scale-[102%] transition-all duration-300',
                                {
                                    'bg-primary text-primary-foreground':
                                        isActive,
                                }
                            )}>
                            <SettingsIcon className='w-4 h-4' />
                            Настройки
                        </Button>
                    )
                }}
            </NavLink>
        </nav>
    )
}

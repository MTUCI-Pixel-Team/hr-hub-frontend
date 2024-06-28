import { Menu } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { Button } from '@/shared/ui/button'

interface HeaderProps {
    render: ReactNode
    setMenu: (menu: boolean) => void
}

export const Header: FC<HeaderProps> = ({ render, setMenu }) => {
    return (
        <header className='p-6 bg-background border-b border-muted flex items-center gap-4 h-16'>
            <Button
                size={'sm'}
                className='max-sm:flex hidden w-10 h-10 items-center justify-center'
                onClick={() => setMenu(true)}>
                <Menu />
            </Button>
            {render}
        </header>
    )
}

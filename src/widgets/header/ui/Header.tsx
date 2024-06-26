import { ReactNode } from 'react'
import { Filter, Sort } from '@/features/filterSort'
import { Search } from '@/features/search'

export const Header = ({ renderFilter }: { renderFilter: ReactNode }) => {
    return (
        <header className='bg-background border-b border-muted flex items-center gap-4 px-6 h-16'>
            <Search />
            <Filter render={renderFilter} />
            <Sort />
        </header>
    )
}

import React from 'react'
import { FilterSortLayout } from '@/features/filterSort'
import { Search } from '@/features/search'

export const Header = () => {
    return (
        <header className='bg-background border-b border-muted flex items-center gap-4 px-6 h-16'>
            <Search />
            <FilterSortLayout />
        </header>
    )
}

import React from 'react'
import { Filter } from './Filter'
import { Sort } from './Sort'

export const FilterSortLayout = () => {
    return (
        <div className='flex gap-4'>
            <Filter />
            <Sort />
        </div>
    )
}

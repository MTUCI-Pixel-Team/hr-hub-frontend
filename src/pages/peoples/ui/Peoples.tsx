import { Link } from 'react-router-dom'
import { CreatePeople } from '@/widgets/createPeople'
import { FilteringByPeople } from '@/widgets/filteringByPeople'
import { FilterSortLayout } from '@/features/filterSort'
import { Search } from '@/features/search'
import { DefaultCard } from '@/entities/defaultCard'

const data = [
    {
        name: 'Александр',
        profession: 'Веб-разработчик',
        unreadMessages: 3,
        user_id: 1,
    },
]

export const PeoplesPage = () => {
    return (
        <>
            <header className='p-6 bg-background border-b border-muted flex items-center gap-4 px-6 h-16'>
                <Search placeholder='Поиск людей...' />
                <FilterSortLayout />
                <CreatePeople renderFilter={<FilteringByPeople />} />
            </header>
            <main className='p-6 overflow-y-auto'>
                {new Array(10).fill(0).map((_, index) => (
                    <Link to='/peoples/1'>
                        <DefaultCard
                            className='transition-all duration-300 hover:scale-[101%] hover:bg-primary-foreground'
                            {...data[0]}
                            key={index}
                        />
                    </Link>
                ))}
            </main>
        </>
    )
}

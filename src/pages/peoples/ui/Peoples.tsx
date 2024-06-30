import { Link } from 'react-router-dom'
import { CreatePeople } from '@/widgets/createPeople'
import { FilteringByPeople } from '@/widgets/filteringByPeople'
import { Header } from '@/widgets/header'
import { useLayoutStore } from '@/widgets/layouts'
import { Sort } from '@/features/filterSort'
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
    const setMenu = useLayoutStore((state) => state.setMenu)

    return (
        <>
            <Header
                setMenu={setMenu}
                render={
                    <>
                        <Search placeholder='Поиск людей...' />
                        <Sort />
                        <CreatePeople renderFilter={<FilteringByPeople />} />
                    </>
                }
            />
            {/* <header className='p-6 bg-background border-b border-muted flex items-center gap-4 px-6 h-16'></header> */}
            <main className='p-6 overflow-y-auto'>
                {new Array(10).fill(0).map((_, index) => (
                    <Link to='/peoples/1'>
                        <DefaultCard
                            className='rounded-2xl transition-all duration-300 hover:scale-[101%] hover:bg-primary-foreground'
                            {...data[0]}
                            key={index}
                        />
                    </Link>
                ))}
            </main>
        </>
    )
}

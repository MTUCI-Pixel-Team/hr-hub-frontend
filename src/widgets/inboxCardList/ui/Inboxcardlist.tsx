import { DefaultCard } from '@/entities/defaultCard'

const data = [
    {
        name: 'Александр',
        username: 'alex',
        platform: 'Telegram',
        profession: 'Веб-разработчик',
        date: '16:30 26.06.2024',
        inbox: true,
        text: 'Привет, как дела?',
    },
]

export const InboxCardList = () => {
    return (
        <div className='flex-1 overflow-y-auto'>
            <div className='grid gap-4 p-6'>
                {new Array(3).fill(0).map((_, index) => (
                    <DefaultCard {...data[0]} key={index} />
                ))}
            </div>
        </div>
    )
}

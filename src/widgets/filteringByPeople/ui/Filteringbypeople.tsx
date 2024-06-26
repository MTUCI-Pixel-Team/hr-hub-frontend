import classNames from 'classnames'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const data = [
    {
        id: '1',
        name: 'Сергей',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '2',
        name: 'Алексей',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '3',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '4',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '5',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '6',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '7',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '8',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '9',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '10',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '11',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '12',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '13',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '14',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '15',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '16',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '17',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '18',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '19',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '20',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '21',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '22',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '23',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '24',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '25',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '26',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
]

interface Person {
    id: string
    name: string
    avatar: string
}

export const FilteringByPeople = () => {
    const [pickedPeople, setPickedPeople] = useState<Person[]>([])

    const handelSelectPerson = (person: Person) => {
        if (pickedPeople.includes(person)) {
            setPickedPeople(pickedPeople.filter((p) => p.id !== person.id))
        } else {
            setPickedPeople([...pickedPeople, person])
        }
    }
    return (
        <>
            <Input className='mb-2' placeholder='Поиск пользователей...' />
            <div className='flex flex-col gap-1 max-h-72 overflow-auto'>
                {data.map((person) => {
                    const isSelected = pickedPeople.includes(person)
                    return (
                        <Button
                            onClick={() => handelSelectPerson(person)}
                            variant='ghost'
                            className={classNames(
                                'h-12 flex items-center justify-start transition-all duration-300 group',
                                {
                                    'bg-primary text-accent-foreground':
                                        isSelected,
                                }
                            )}
                            type='button'
                            key={person.id}>
                            <div
                                className={classNames(
                                    'flex items-center gap-3 transition-all duration-300 group-hover:text-primary',
                                    {
                                        'text-primary-foreground': isSelected,
                                    }
                                )}>
                                {isSelected && <CircleX className='h-4 w-4' />}
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarImage src={person.avatar} />
                                    <AvatarFallback>
                                        {person.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <h2 className='font-medium'>{person.name}</h2>
                            </div>
                        </Button>
                    )
                })}
            </div>
        </>
    )
}

import classNames from 'classnames'
import { CircleX, Mail, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuGroup,
} from '@/shared/ui/dropdown-menu'
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
]

interface Person {
    id: string
    name: string
    avatar: string
}

export const People = () => {
    const [pickedPeople, setPickedPeople] = useState<Person[]>([])

    const handelSelectPerson = (person: Person) => {
        if (pickedPeople.includes(person)) {
            setPickedPeople(pickedPeople.filter((p) => p.id !== person.id))
        } else {
            setPickedPeople([...pickedPeople, person])
        }
    }

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <UserPlus className='mr-2 h-4 w-4' />
                <span>Люди</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent className='p-3'>
                    <DropdownMenuLabel className='mb-2'>
                        Фильтрация по пользователям:
                    </DropdownMenuLabel>
                    <Input
                        className='mb-2'
                        placeholder='Поиск пользователей...'
                    />
                    {/* <DropdownMenuItem>
                        <div className='flex items-center gap-3'>
                            <Avatar className='w-10 h-10 border'>
                                <AvatarImage src='/placeholder-user.jpg' />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <h2 className='font-medium'>Сергей</h2>
                        </div>
                    </DropdownMenuItem> */}
                    <div className='flex flex-col gap-1'>
                        {data.map((person) => {
                            const isSelected = pickedPeople.includes(person)
                            return (
                                <Button
                                    onClick={() => handelSelectPerson(person)}
                                    variant='ghost'
                                    className={classNames(
                                        'h-12 flex items-center justify-start',
                                        {
                                            'bg-accent text-accent-foreground':
                                                isSelected,
                                        }
                                    )}
                                    key={person.id}>
                                    <div className='flex items-center gap-3'>
                                        {isSelected && (
                                            <CircleX className='h-4 w-4' />
                                        )}
                                        <Avatar className='w-10 h-10 border'>
                                            <AvatarImage src={person.avatar} />
                                            <AvatarFallback>
                                                {person.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <h2 className='font-medium'>
                                            {person.name}
                                        </h2>
                                    </div>
                                </Button>
                            )
                        })}
                    </div>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    )
}

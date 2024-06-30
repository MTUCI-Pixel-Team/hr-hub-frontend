import { useFormContext } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Checkbox } from '@/shared/ui/checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form'
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
    {
        id: '27',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '28',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '29',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '30',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '31',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '32',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '33',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '34',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '35',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '36',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '37',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '38',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '39',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '40',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '41',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '42',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '43',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '44',
        name: 'Иван',
        avatar: '/placeholder-user.jpg',
    },
    {
        id: '45',
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
    const form = useFormContext()

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name='username'
                    render={() => (
                        <FormItem>
                            <FormLabel>Выберите пользователей:</FormLabel>
                            <FormDescription className='pb-1'>
                                <Input placeholder='Поиск пользователей...' />
                            </FormDescription>
                            <div className='flex flex-wrap gap-1 items-center pb-1'>
                                {form
                                    .watch('username')
                                    ?.map((person: Person, index: number) => {
                                        if (index > 3) return null
                                        return (
                                            <Avatar>
                                                <AvatarImage src={''} />
                                                <AvatarFallback>
                                                    {person.name.slice(0, 1)}
                                                </AvatarFallback>
                                            </Avatar>
                                        )
                                    })}
                                {form.watch('username').length > 4 ? (
                                    <Avatar>
                                        <AvatarFallback>
                                            +{' '}
                                            {form.watch('username').length - 4}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : null}
                            </div>
                            <div className='flex flex-col  max-h-72 overflow-y-auto overflow-x-hidden relative'>
                                {data.map((person: Person) => (
                                    <FormField
                                        key={person.id}
                                        control={form.control}
                                        name='username'
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={person.id}
                                                    className='min-w-64 flex flex-row items-start space-x-3 space-y-[-2px] p-2 transition-all duration-300 rounded-xl hover:bg-primary-foreground hover:scale-[101%]'>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                !!field.value?.find(
                                                                    (
                                                                        item: Person
                                                                    ) =>
                                                                        item.id ===
                                                                        person.id
                                                                )
                                                            }
                                                            onCheckedChange={(
                                                                checked
                                                            ) => {
                                                                console.log(
                                                                    'change',
                                                                    checked
                                                                )
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              person,
                                                                          ]
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  item: Person
                                                                              ) =>
                                                                                  item.id !==
                                                                                  person.id
                                                                          )
                                                                      )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className='cursor-pointer font-normal flex flex-col gap-1 w-full'>
                                                        <p className='font-medium flex gap-1'>
                                                            {person.name}
                                                            <p className='font-light text-secondary-foreground'>
                                                                @Tomato1337
                                                            </p>
                                                        </p>
                                                        <p className='font-light text-secondary-foreground'>
                                                            Telegram
                                                        </p>
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

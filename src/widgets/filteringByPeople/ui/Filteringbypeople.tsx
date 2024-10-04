import { FC, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn, getPlatform } from '@/shared/lib/utils'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
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
import { Skeleton } from '@/shared/ui/skeleton'
import { IUniqueUsers } from '../model'

// interface Person {
//     id: number
//     username: string
//     service: string
// }

interface FilteringByPeopleProps {
    data: IUniqueUsers[] | undefined
    pickPeoples?: IUniqueUsers[] | undefined
    isUpdating?: boolean
    isLoading: boolean
    isError: boolean
    error: any
}

export const FilteringByPeople: FC<FilteringByPeopleProps> = ({
    data,
    isUpdating = false,
    isLoading,
    isError,
    pickPeoples,
    error,
}) => {
    const form = useFormContext()
    const [search, setSearch] = useState('')
    const eachData = isUpdating ? pickPeoples : data

    // useEffect(() => {
    //     if (pickPeoples) {
    //         // form.setValue(
    //         //     'username',
    //         //     pickPeoples.filter((item) => item.added)
    //         // )
    //         form.reset({
    //             username: pickPeoples.filter((item) => item.added),
    //         })
    //     }
    // }, [pickPeoples])

    console.log(data)

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
                                <Input
                                    placeholder='Поиск пользователей...'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormDescription>
                            <div className='flex flex-wrap gap-1 items-center pb-1'>
                                {form
                                    .watch('username')
                                    ?.map(
                                        (
                                            person: IUniqueUsers,
                                            index: number
                                        ) => {
                                            const platform = getPlatform(
                                                person.service_name,
                                                'service'
                                            )
                                            if (index > 3) return null
                                            return (
                                                <Avatar>
                                                    <AvatarFallback
                                                        className={cn(
                                                            platform?.bg,
                                                            'text-white'
                                                        )}>
                                                        {person.username_from_message.slice(
                                                            0,
                                                            1
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )
                                        }
                                    )}
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
                                {isLoading && (
                                    <div className='space-y-2'>
                                        {new Array(5).fill(0).map(() => (
                                            <Skeleton className=' h-16 w-full' />
                                        ))}
                                    </div>
                                )}

                                {isError && (
                                    <div className='text-red-500'>
                                        {error.message}
                                    </div>
                                )}

                                {eachData && eachData?.length <= 0 && (
                                    <div>Пока у вас нет пользователей</div>
                                )}

                                {eachData &&
                                    eachData
                                        .filter(
                                            (item) =>
                                                item.username_from_message
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    ) ||
                                                item.service_name
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )
                                        )
                                        .map((person: IUniqueUsers) => (
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
                                                                                item: IUniqueUsers
                                                                            ) =>
                                                                                item.id ===
                                                                                person.id
                                                                        )
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
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
                                                                                          item: IUniqueUsers
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
                                                                    {
                                                                        person.username_from_message
                                                                    }
                                                                </p>
                                                                <p className='font-light text-secondary-foreground'>
                                                                    {
                                                                        person.service_name
                                                                    }
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

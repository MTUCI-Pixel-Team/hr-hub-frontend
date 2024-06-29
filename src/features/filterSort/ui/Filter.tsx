import { zodResolver } from '@hookform/resolvers/zod'
import { FilterIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Form } from '@/shared/ui/form'

const formSchema = z.object({
    username: z
        .array(
            z.object({ id: z.string(), name: z.string(), avatar: z.string() })
        )
        .refine((value) => value.length > 0, {
            message: 'Добавьте хотя бы один никнейм',
        }),
})

export const Filter = ({ render }: { render: ReactNode }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: [],
        },
        mode: 'onSubmit',
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                    <FilterIcon className='w-4 h-4' />
                    <span className='sr-only'>Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <Form {...form}>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='p-4 flex flex-col gap-2'>
                            {render}
                            <div className='flex items-center gap-4 justify-between'>
                                <Button className='flex-1' type='submit'>
                                    Применить
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        form.reset()
                                    }}
                                    variant={'secondary'}>
                                    Сбросить
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

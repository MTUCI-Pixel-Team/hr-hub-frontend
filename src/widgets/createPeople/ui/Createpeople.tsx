import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/shared/ui/button'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/shared/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Имя должно содержать минимум 2 символа',
    }),
    profession: z.string().min(2, {
        message: 'Профессия должна содержать минимум 2 символа',
    }),
    username: z
        .array(
            z.object({ id: z.string(), name: z.string(), avatar: z.string() })
        )
        .refine((value) => value.length > 0, {
            message: 'Добавьте хотя бы один никнейм',
        }),
})

export const CreatePeople = ({ renderFilter }: { renderFilter: ReactNode }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            profession: '',
            username: [],
        },
        mode: 'onChange',
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    console.log(form.getValues())

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger>
                <Button
                    variant='outline'
                    size={'sm'}
                    className='shrink-0 w-10 h-10 transition-all duration-300 hover:scale-[102%]'>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-auto'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>Создание нового пользователя</DialogTitle>
                    <DialogDescription>
                        Введите данные нового пользователя и добавьте его
                        никнеймы
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='flex flex-col gap-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                Имя пользователя:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    placeholder='Алексей Петров'
                                                    className='input'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='profession'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                Профессия пользователя:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    placeholder='Frontend Developer'
                                                    className='input'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            {renderFilter}

                            <div className='flex gap-3'>
                                <Button
                                    type='submit'
                                    className='w-32 h-full transition-all duration-300 hover:scale-[102%]'>
                                    Создать
                                </Button>
                                <Button
                                    onClick={() => setModalOpen(false)}
                                    type='button'
                                    variant='secondary'
                                    className='h-full transition-all duration-300 hover:scale-[105%]'>
                                    Отмена
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

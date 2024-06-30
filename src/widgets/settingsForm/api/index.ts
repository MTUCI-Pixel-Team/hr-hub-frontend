import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { Api } from '@/shared/api'
import { formSchema } from '../models'

export const useUpdateHrUser = () => {
    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const response = await Api.patchWithToken('user/update-user/', data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hrUserInfo'] })
        },
    })

    return query
}

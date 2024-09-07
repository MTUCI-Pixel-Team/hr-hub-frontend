import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ICustomUser } from '@/entities/customUsers'
import { Api } from '@/shared/api'
import { formSchema } from '../models'

export const useUpdateCustomUser = (userId: number | undefined) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: ['updateCustomUser'],
        mutationFn: (data: z.infer<typeof formSchema>) => {
            const formatData = {
                group_name: data.name,
                profession: data.profession,
                members: {} as Record<number, boolean>,
            }

            data.username.forEach((item) => {
                formatData.members[item.id] = true
            })

            return Api.putWithToken(`user/custom-user/${userId}`, formatData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
        },
    })

    return mutation
}

export const useCreateCustomUser = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationKey: ['createCustomUser'],
        mutationFn: (data: z.infer<typeof formSchema>) => {
            const formatData = {
                group_name: data.name,
                profession: data.profession,
                usernames_and_services: data.username.map((item) => {
                    return {
                        username: item.username_from_message,
                        service: item.service_name,
                    }
                }),
            }

            return Api.postWithToken<typeof formatData, ICustomUser>(
                'user/custom-user/',
                formatData
            )
        },
        onSuccess: (item) => {
            queryClient.invalidateQueries()
            navigate(`/peoples/${item.id}`)
        },
    })

    return mutation
}

export const useDeleteCustomUser = (userId: number | undefined) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: ['deleteCustomUser'],
        mutationFn: () => {
            return Api.deleteWithToken(`user/custom-user/${userId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
        },
    })

    return mutation
}

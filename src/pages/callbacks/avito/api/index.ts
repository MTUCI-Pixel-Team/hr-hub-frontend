import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { User } from '@/entities/hrCard'
import { Api } from '@/shared/api'
import { IAvitoRegistration } from '../model'

export const useAvitoRegistration = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async (data: IAvitoRegistration) => {
            const userInfo = await Api.getWithToken<User>('user/update-user/')
            return Api.postWithToken('service/avito_registration/', {
                ...data,
                service_username: userInfo.username,
            })
        },
        onSuccess: () => {
            navigate('/settings')
        },
    })

    return mutation
}

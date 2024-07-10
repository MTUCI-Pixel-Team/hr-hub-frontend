import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { User } from '@/entities/hrCard'
import { Api } from '@/shared/api'
import { IAvitoRegistration } from '../model'

export const useAvitoRegistration = () => {
    const mutation = useMutation({
        mutationFn: async (data: IAvitoRegistration) => {
            const userInfo = await Api.getWithToken<User>('user/update-user/')
            return Api.postWithToken('service/avito_registration/', {
                ...data,
                service_username: userInfo.username,
            })
        },
    })

    return mutation
}

export const useAvitoWebHookRegistration = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await Api.postWithToken<object, string[]>(
                'message/register_avito_webhook/',
                {}
            )
            // response: ["{\"ok\": true}"]
            if (!(response[0].includes('ok') && response[0].includes('true'))) {
                throw new Error('Не удалось зарегистрировать webhook')
            }
            console.log(response)
            return response
        },
        onSuccess: () => {
            navigate('/settings')
        },
    })

    return mutation
}

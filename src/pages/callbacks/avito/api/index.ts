import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Api } from '@/shared/api'
import { IAvitoRegistration } from '../model'

export const useAvitoRegistration = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (data: IAvitoRegistration) => {
            return Api.postWithToken('service/avito_registration/', data)
        },
        onSuccess: () => {
            navigate('/settings')
        },
    })

    return mutation
}

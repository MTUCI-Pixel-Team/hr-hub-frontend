import { create } from 'zustand'

type Service = {
    app_password: string
    created_at: string
    email: string
    id: number
    service_name: string
    service_username: string
    user_id: number
}

type HrUserInfoStore = {
    username: string
    setUsername: (username: string) => void
    email: string
    setEmail: (email: string) => void
    id: number | undefined
    setId: (id: number) => void
    services: Service[]
    setServices: (services: Service[]) => void
}

export const useHrUserInfo = create<HrUserInfoStore>((set) => ({
    username: '',
    setUsername: (username: string) => set({ username }),
    email: '',
    id: undefined,
    setId: (id: number) => set({ id }),
    setEmail: (email: string) => set({ email }),
    services: [],
    setServices: (services: Service[]) => set({ services }),
}))

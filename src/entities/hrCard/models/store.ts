import { create } from 'zustand'

type HrUserInfoStore = {
    username: string
    setUsername: (username: string) => void
}

export const useHrUserInfo = create<HrUserInfoStore>((set) => ({
    username: '',
    setUsername: (username: string) => set({ username }),
}))

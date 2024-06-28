import { create } from 'zustand'

type LayoutStore = {
    menu: boolean
    setMenu: (menu: boolean) => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
    menu: false,
    setMenu: (menu: boolean) => set({ menu }),
}))

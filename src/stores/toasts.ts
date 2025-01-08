import { defineStore } from 'pinia'

export type Toast = {
  id: string
  text: string
  type: 'success' | 'error'
}

export const useToastsStore = defineStore('toasts', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    addToast(toast: Omit<Toast, 'id'>) {
      this.toasts.push({
        ...toast,
        id: Math.random().toString(36).substring(2, 15),
      })
    },
    removeToast(toast: Toast) {
      this.toasts = this.toasts.filter((t) => t.id !== toast.id)
    },
  },
})

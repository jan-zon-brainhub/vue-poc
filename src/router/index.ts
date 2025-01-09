import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: () => import('../views/AddRecipeView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/recipe/:id/edit',
      name: 'edit-recipe',
      component: () => import('../views/EditRecipeView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: () => import('../views/RecipeView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.user) {
      authStore.setReturnUrl(to.fullPath)
      return '/login'
    }
  }
  if (to.path === '/login' && authStore.user) {
    return from.fullPath
  }
})

export default router

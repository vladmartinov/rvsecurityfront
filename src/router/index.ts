import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/',
      name: 'main',
      component: () => import('../views/layout/Layout.vue'),
      redirect: '/users',
      children: [
        {
          beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();

            if (authStore.isLoggedIn) next();
            else next('/login');
          },
          path: '/users',
          name: 'users',
          component: () => import('../views/dict/UsersDict.vue'),
        }
      ]
    },
  ],
})

export default router

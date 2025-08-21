import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/Home.vue'),
    },
    {
      path: '/manage',
      name: 'Manage',
      component: () => import('@/views/Manage/Manage.vue'),
    },
  ],
})

export default router

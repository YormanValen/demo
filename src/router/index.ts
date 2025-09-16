import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'registro',
    component: () => import('../modules/registro/views/RegistroView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

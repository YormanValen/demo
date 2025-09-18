import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/registration/basic-information'
  },
  {
    path: '/registration',
    redirect: '/registration/basic-information'
  },
  {
    path: '/registration/basic-information',
    name: 'registration-step1',
    component: () => import('../modules/registration/views/RegistrationStep1View.vue')
  },
  {
    path: '/registration/financial-information',
    name: 'registration-step2',
    component: () => import('../modules/financial/views/FinancialView.vue')
  },
  {
    path: '/registration/finerio-information',
    name: 'registration-step3',
    component: () => import('../modules/registration/views/RegistrationStep3View.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

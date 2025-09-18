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
    component: () => import('../modules/finerio-stage/views/FinerioStageView.vue')
  },
  {
    path: '/finerio/process',
    name: 'finerio-process',
    component: () => import('../modules/finerio-stage/views/FinerioProcessView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/connect-stage1',
    name: 'finerio-connect-stage1',
    component: () => import('../modules/finerio-stage/views/FinerioConnectStage1View.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/connected-accounts',
    name: 'finerio-connected-accounts',
    component: () => import('../modules/finerio-stage/views/ConnectedAccountsView.vue'),
    meta: { hideLayout: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

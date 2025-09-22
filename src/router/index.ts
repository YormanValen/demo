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
    path: '/finerio/connect-stage2',
    name: 'finerio-connect-stage2',
    component: () => import('../modules/finerio-stage/views/FinerioConnectStage2View.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/data-access',
    name: 'finerio-data-access',
    component: () => import('../modules/finerio-stage/views/DataAccessView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/data-usage-mode',
    name: 'finerio-data-usage-mode',
    component: () => import('../modules/finerio-stage/views/DataUsageModeView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/connect-institutions',
    name: 'finerio-connect-institutions',
    component: () => import('../modules/finerio-stage/views/ConnectInstitutionsView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/validation',
    name: 'finerio-validation',
    component: () => import('../modules/finerio-stage/views/ValidationView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/connected-accounts',
    name: 'finerio-connected-accounts',
    component: () => import('../modules/finerio-stage/views/ConnectedAccountsView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/dashboard',
    name: 'bankambient-dashboard',
    component: () => import('../modules/bankambient/views/BankDashboardView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/dashboard/blue',
    name: 'bankambient-dashboard-blue',
    component: () => import('../modules/bankambient/views/BankDashboardViewBlue.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/dashboard/red',
    name: 'bankambient-dashboard-red',
    component: () => import('../modules/bankambient/views/BankDashboardViewRed.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/dashboard/green',
    name: 'bankambient-dashboard-green',
    component: () => import('../modules/bankambient/views/BankDashboardViewGreen.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/account-selection',
    name: 'bankambient-account-selection',
    component: () => import('../modules/bankambient/views/AccountSelectionView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/connection-loading',
    name: 'bankambient-connection-loading',
    component: () => import('../modules/bankambient/views/ConnectionLoadingView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/connection-success',
    name: 'bankambient-connection-success',
    component: () => import('../modules/bankambient/views/ConnectionSuccessView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/bankambient/thank-you',
    name: 'bankambient-thank-you',
    component: () => import('../modules/bankambient/views/ThankYouView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/finerio/institution-details',
    name: 'finerio-institution-details',
    component: () => import('../modules/finerio-stage/views/IntitutionDetail.vue'),
    meta: { hideLayout: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

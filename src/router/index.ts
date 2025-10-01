import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/registration/experience-selection'
  },
  {
    path: '/registration',
    redirect: '/registration/experience-selection'
  },
  {
    path: '/registration/experience-selection',
    name: 'experience-selection',
    component: () => import('../modules/registration/views/ExperienceSelectionView.vue')
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
    path: '/registration/financial-verification',
    name: 'registration-step3',
    component: () => import('../modules/finerio-stage/views/FinerioStageView.vue')
  },
  {
    path: '/financial/process',
    name: 'financial-process',
    component: () => import('../modules/finerio-stage/views/FinerioProcessView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/connect-stage1',
    name: 'financial-connect-stage1',
    component: () => import('../modules/finerio-stage/views/FinerioConnectStage1View.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/data-access',
    name: 'financial-data-access',
    component: () => import('../modules/finerio-stage/views/DataAccessView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/data-usage-mode',
    name: 'financial-data-usage-mode',
    component: () => import('../modules/finerio-stage/views/DataUsageModeView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/connect-institutions',
    name: 'financial-connect-institutions',
    component: () => import('../modules/finerio-stage/views/ConnectInstitutionsView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/validation',
    name: 'financial-validation',
    component: () => import('../modules/finerio-stage/views/ValidationView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/connected-accounts',
    name: 'financial-connected-accounts',
    component: () => import('../modules/finerio-stage/views/ConnectedAccountsView.vue'),
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
    path: '/bankambient/data-processing',
    name: 'bankambient-data-processing',
    component: () => import('../modules/bankambient/views/DataProcessingAnimationView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/financial/institution-details',
    name: 'financial-institution-details',
    component: () => import('../modules/finerio-stage/views/IntitutionDetail.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/consent',
    name: 'consent',
    component: () => import('../modules/consent/views/consentView.vue'),
    meta: { hideLayout: false }
  },
  {
    path: '/financial/congrats',
    name: 'financial-congrats',
    component: () => import('../modules/financial/views/CongratsView.vue'),
    meta: { hideLayout: false }
  },
  {
    path: '/entity',
    component: () => import('../modules/entity/layouts/EntityLayout.vue'),
    meta: { hideLayout: false },
    children: [
      {
        path: 'dashboard',
        name: 'entity-dashboard',
        component: () => import('../modules/entity/views/EntityDashboardView.vue')
      },
      {
        path: 'consent-management',
        name: 'entity-consent-management',
        component: () => import('../modules/entity/views/ConsentManagementView.vue')
      },
      {
        path: 'consent-revocation',
        name: 'entity-consent-revocation',
        component: () => import('../modules/entity/views/ConsentRevocationView.vue')
      },
      {
        path: 'analytics',
        name: 'entity-analytics',
        component: () => import('../modules/entity/views/AnalyticsView.vue')
      }
    ]
  },
  {
    path: '/entity/login',
    name: 'entity-login',
    component: () => import('../modules/entity/views/EntityLoginView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/two-factor',
    name: 'entity-two-factor',
    component: () => import('../modules/entity/views/EntityTwoFactorView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights',
    name: 'entity-transactional-insights',
    component: () => import('../modules/transactional-insights/views/TransactionalInsightsIntroView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights/bank-selection',
    name: 'entity-transactional-insights-bank-selection',
    component: () => import('../modules/transactional-insights/views/BankSelectionAnimationView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights/bank/:bankId',
    name: 'entity-transactional-insights-bank-transaction',
    component: () => import('../modules/transactional-insights/views/BankTransactionView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights/history',
    name: 'entity-transactional-insights-history-transaction',
    component: () => import('../modules/transactional-insights/views/HistoryTransactionView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights/categorizacion-intro',
    name: 'entity-transactional-insights-categorizacion-intro',
    component: () => import('../modules/transactional-insights/views/CategorizacionIntroView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights/agregados-categorizacion',
    name: 'entity-transactional-insights-agregados-categorizacion',
    component: () => import('../modules/transactional-insights/views/AgregadosCategorizacionView.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/entity/transactional-insights/submenu',
    name: 'entity-transactional-insights-submenu',
    component: () => import('../modules/transactional-insights/views/TransactionalInsightsSubmenuView.vue'),
    meta: { hideLayout: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

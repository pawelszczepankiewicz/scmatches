import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../pages/DashboardPage.vue'),
      meta: { title: 'Live Dashboard' },
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('../pages/ShowcasePage.vue'),
      meta: { title: 'Technical Showcase' },
    },
  ],
});

export default router;

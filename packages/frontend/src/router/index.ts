import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'demo',
      component: () => import('../pages/TransformDemoPage.vue'),
      meta: { title: 'Refactoring Demo' },
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () => import('../pages/HowItWorksPage.vue'),
      meta: { title: 'How It Works' },
    },
    {
      path: '/problems',
      name: 'problems',
      component: () => import('../pages/ProblemsPage.vue'),
      meta: { title: 'Problems Fixed' },
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

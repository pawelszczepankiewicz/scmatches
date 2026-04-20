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
            path: '/showcase',
            name: 'showcase',
            component: () => import('../pages/ShowcasePage.vue'),
            meta: { title: 'Technical Showcase' },
        },
    ],
});
export default router;

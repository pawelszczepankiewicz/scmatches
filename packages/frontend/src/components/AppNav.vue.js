import { useRoute } from 'vue-router';
const route = useRoute();
const links = [
    { to: '/', label: 'Dashboard', exact: true },
    { to: '/showcase', label: 'Showcase', exact: false },
];
function isActive(link) {
    if (link.exact)
        return route.path === link.to;
    return route.path.startsWith(link.to);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "app-nav" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-nav__inner" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "app-nav__brand" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "app-nav__brand" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "app-nav__brand-o" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-nav__links" },
});
for (const [link] of __VLS_getVForSourceType((__VLS_ctx.links))) {
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: (link.to),
        to: (link.to),
        ...{ class: "app-nav__link" },
        ...{ class: ({ 'app-nav__link--active': __VLS_ctx.isActive(link) }) },
    }));
    const __VLS_6 = __VLS_5({
        key: (link.to),
        to: (link.to),
        ...{ class: "app-nav__link" },
        ...{ class: ({ 'app-nav__link--active': __VLS_ctx.isActive(link) }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    (link.label);
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['app-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['app-nav__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['app-nav__brand']} */ ;
/** @type {__VLS_StyleScopedClasses['app-nav__brand-o']} */ ;
/** @type {__VLS_StyleScopedClasses['app-nav__links']} */ ;
/** @type {__VLS_StyleScopedClasses['app-nav__link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            links: links,
            isActive: isActive,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

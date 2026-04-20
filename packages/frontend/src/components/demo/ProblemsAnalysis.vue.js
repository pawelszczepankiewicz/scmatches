import { ref } from 'vue';
import { PROBLEMS } from '../../data/problemsData';
const openIndex = ref(null);
function toggle(i) {
    openIndex.value = openIndex.value === i ? null : i;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "problems" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "problems__title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "problems__intro" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "problems__list" },
});
for (const [p, i] of __VLS_getVForSourceType((__VLS_ctx.PROBLEMS))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (i),
        ...{ class: "problems__item" },
        ...{ class: ({ 'problems__item--open': __VLS_ctx.openIndex === i }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggle(i);
            } },
        ...{ class: "problems__header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "problems__number" },
    });
    (i + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "problems__name" },
    });
    (p.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "problems__chevron" },
    });
    (__VLS_ctx.openIndex === i ? '−' : '+');
    if (__VLS_ctx.openIndex === i) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "problems__body" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "problems__section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "problems__label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (p.description);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "problems__section problems__section--fix" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "problems__label problems__label--fix" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (p.fix);
    }
}
/** @type {__VLS_StyleScopedClasses['problems']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__title']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__list']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__item']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__header']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__number']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__name']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__body']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__section']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__label']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__section']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__section--fix']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__label']} */ ;
/** @type {__VLS_StyleScopedClasses['problems__label--fix']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PROBLEMS: PROBLEMS,
            openIndex: openIndex,
            toggle: toggle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

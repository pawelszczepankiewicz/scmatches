import MatchCard from './MatchCard.vue';
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard__loading" },
    });
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard__error" },
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard__grid" },
    });
    for (const [match] of __VLS_getVForSourceType((__VLS_ctx.matches))) {
        /** @type {[typeof MatchCard, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(MatchCard, new MatchCard({
            key: (match.id),
            match: (match),
        }));
        const __VLS_1 = __VLS_0({
            key: (match.id),
            match: (match),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
}
if (!__VLS_ctx.loading && __VLS_ctx.matches.length === 0 && !__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "dashboard__empty" },
    });
}
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__loading']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__error']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__empty']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MatchCard: MatchCard,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */

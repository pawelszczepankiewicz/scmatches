import { computed } from 'vue';
import MatchCard from '../MatchCard.vue';
const props = defineProps();
const validResults = computed(() => props.results
    .map(r => r.parsed)
    .filter((p) => p !== null));
const filteredOut = computed(() => props.results
    .map((r, i) => ({ ...r, sport: props.rawMatches[i]?.sport }))
    .filter(r => r.parsed === null));
const consoleOutput = computed(() => {
    const simple = validResults.value.map(m => ({
        name: m.name,
        score: m.score,
    }));
    return JSON.stringify(simple, null, 2);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "output" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "output__title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "output__layout" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "output__cards" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
if (__VLS_ctx.validResults.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "output__empty" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "output__grid" },
});
for (const [result] of __VLS_getVForSourceType((__VLS_ctx.validResults))) {
    /** @type {[typeof MatchCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MatchCard, new MatchCard({
        key: (result.id),
        match: (result),
    }));
    const __VLS_1 = __VLS_0({
        key: (result.id),
        match: (result),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.filteredOut.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "output__filtered" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    for (const [item, i] of __VLS_getVForSourceType((__VLS_ctx.filteredOut))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (i),
            ...{ class: "output__filtered-card" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "output__filtered-sport" },
        });
        (item.sport || '(empty)');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "output__filtered-reason" },
        });
        (item.error);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "output__console" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
    ...{ class: "output__pre" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.consoleOutput);
/** @type {__VLS_StyleScopedClasses['output']} */ ;
/** @type {__VLS_StyleScopedClasses['output__title']} */ ;
/** @type {__VLS_StyleScopedClasses['output__layout']} */ ;
/** @type {__VLS_StyleScopedClasses['output__cards']} */ ;
/** @type {__VLS_StyleScopedClasses['output__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['output__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['output__filtered']} */ ;
/** @type {__VLS_StyleScopedClasses['output__filtered-card']} */ ;
/** @type {__VLS_StyleScopedClasses['output__filtered-sport']} */ ;
/** @type {__VLS_StyleScopedClasses['output__filtered-reason']} */ ;
/** @type {__VLS_StyleScopedClasses['output__console']} */ ;
/** @type {__VLS_StyleScopedClasses['output__pre']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MatchCard: MatchCard,
            validResults: validResults,
            filteredOut: filteredOut,
            consoleOutput: consoleOutput,
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

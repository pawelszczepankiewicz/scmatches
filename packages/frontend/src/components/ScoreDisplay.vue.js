import { computed } from 'vue';
const props = defineProps();
const details = computed(() => {
    const raw = props.score;
    // Set-based sports (tennis, volleyball): "Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)"
    const parenMatch = raw.match(/\((.+)\)/);
    if (parenMatch) {
        return parenMatch[1]
            .split(',')
            .map((s, i) => ({
            label: `S${i + 1}`,
            value: s.replace(/set\d+\s*/, '').trim(),
        }))
            .filter(d => d.value.length > 0);
    }
    // Basketball: "9:7,2:1,5:3,9:9" — show as quarters
    if (props.sport === 'basketball') {
        return raw.split(',').map((q, i) => ({
            label: `Q${i + 1}`,
            value: q.trim(),
        }));
    }
    return [];
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.details.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "score-display" },
    });
    for (const [detail, index] of __VLS_getVForSourceType((__VLS_ctx.details))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "score-display__set" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "score-display__set-label" },
        });
        (detail.label);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "score-display__set-value" },
        });
        (detail.value);
    }
}
/** @type {__VLS_StyleScopedClasses['score-display']} */ ;
/** @type {__VLS_StyleScopedClasses['score-display__set']} */ ;
/** @type {__VLS_StyleScopedClasses['score-display__set-label']} */ ;
/** @type {__VLS_StyleScopedClasses['score-display__set-value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            details: details,
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

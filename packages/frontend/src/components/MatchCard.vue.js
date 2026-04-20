import { computed } from 'vue';
import ScoreDisplay from './ScoreDisplay.vue';
const props = defineProps();
const mainScores = computed(() => {
    const raw = props.match.score;
    // Set-based format: "Main score: 3:0 (set1 ...)"
    if (raw.startsWith('Main score:')) {
        const m = raw.match(/Main score:\s*(\d+):(\d+)/);
        return m ? [m[1], m[2]] : [raw, ''];
    }
    // Basketball: "9:7,2:1,5:3,9:9" — show total or first pair
    if (props.match.sport === 'basketball') {
        // Sum all quarter scores per team
        const quarters = raw.split(',');
        let t1 = 0, t2 = 0;
        for (const q of quarters) {
            const [a, b] = q.split(':').map(Number);
            t1 += a;
            t2 += b;
        }
        return [String(t1), String(t2)];
    }
    // Simple format: "2:1"
    const parts = raw.split(':');
    if (parts.length === 2) {
        return [parts[0].trim(), parts[1].trim()];
    }
    return [raw, ''];
});
const hasSetDetails = computed(() => {
    return props.match.sport === 'volleyball'
        || props.match.sport === 'tennis'
        || props.match.sport === 'basketball';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "match-card" },
    ...{ class: (`match-card--${__VLS_ctx.match.sport}`) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "match-card__header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "match-card__sport-label" },
});
(__VLS_ctx.match.sport);
if (__VLS_ctx.match.isLive) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "match-card__period" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "match-card__scoreboard" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "match-card__row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "match-card__team" },
});
(__VLS_ctx.match.participant1);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "match-card__team-score" },
});
(__VLS_ctx.mainScores[0]);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "match-card__row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "match-card__team" },
});
(__VLS_ctx.match.participant2);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "match-card__team-score" },
});
(__VLS_ctx.mainScores[1]);
if (__VLS_ctx.hasSetDetails) {
    /** @type {[typeof ScoreDisplay, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ScoreDisplay, new ScoreDisplay({
        score: (__VLS_ctx.match.score),
        sport: (__VLS_ctx.match.sport),
    }));
    const __VLS_1 = __VLS_0({
        score: (__VLS_ctx.match.score),
        sport: (__VLS_ctx.match.sport),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {__VLS_StyleScopedClasses['match-card']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__header']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__sport-label']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__period']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__scoreboard']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__row']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__team']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__team-score']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__row']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__team']} */ ;
/** @type {__VLS_StyleScopedClasses['match-card__team-score']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ScoreDisplay: ScoreDisplay,
            mainScores: mainScores,
            hasSetDetails: hasSetDetails,
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

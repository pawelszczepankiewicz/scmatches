import MatchDashboard from '../components/MatchDashboard.vue';
import { useMatches } from '../composables/useMatches';
const { matches, loading, error } = useMatches();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof MatchDashboard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MatchDashboard, new MatchDashboard({
    matches: (__VLS_ctx.matches),
    loading: (__VLS_ctx.loading),
    error: (__VLS_ctx.error),
}));
const __VLS_1 = __VLS_0({
    matches: (__VLS_ctx.matches),
    loading: (__VLS_ctx.loading),
    error: (__VLS_ctx.error),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MatchDashboard: MatchDashboard,
            matches: matches,
            loading: loading,
            error: error,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

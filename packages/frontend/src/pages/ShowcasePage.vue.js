import ShowcaseSection from '../components/showcase/ShowcaseSection.vue';
import { useMatches } from '../composables/useMatches';
const { matches } = useMatches();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof ShowcaseSection, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ShowcaseSection, new ShowcaseSection({
    matches: (__VLS_ctx.matches),
}));
const __VLS_1 = __VLS_0({
    matches: (__VLS_ctx.matches),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ShowcaseSection: ShowcaseSection,
            matches: matches,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

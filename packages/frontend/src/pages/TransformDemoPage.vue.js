import { ref, computed } from 'vue';
import { DEFAULT_RAW_MATCHES } from '../data/defaultMatches';
import { parseMatchClient } from '../utils/parseMatchClient';
import RawDataEditor from '../components/demo/RawDataEditor.vue';
import TransformationEngine from '../components/demo/TransformationEngine.vue';
import FormattedOutput from '../components/demo/FormattedOutput.vue';
import ProblemsAnalysis from '../components/demo/ProblemsAnalysis.vue';
const rawMatches = ref(structuredClone(DEFAULT_RAW_MATCHES));
const parseResults = computed(() => rawMatches.value.map((m, i) => parseMatchClient(m, i)));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "demo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "demo__intro" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
/** @type {[typeof RawDataEditor, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(RawDataEditor, new RawDataEditor({
    modelValue: (__VLS_ctx.rawMatches),
}));
const __VLS_1 = __VLS_0({
    modelValue: (__VLS_ctx.rawMatches),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "demo__divider" },
});
/** @type {[typeof TransformationEngine, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(TransformationEngine, new TransformationEngine({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "demo__divider" },
});
/** @type {[typeof FormattedOutput, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(FormattedOutput, new FormattedOutput({
    results: (__VLS_ctx.parseResults),
    rawMatches: (__VLS_ctx.rawMatches),
}));
const __VLS_7 = __VLS_6({
    results: (__VLS_ctx.parseResults),
    rawMatches: (__VLS_ctx.rawMatches),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "demo__divider" },
});
/** @type {[typeof ProblemsAnalysis, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(ProblemsAnalysis, new ProblemsAnalysis({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['demo']} */ ;
/** @type {__VLS_StyleScopedClasses['demo__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['demo__divider']} */ ;
/** @type {__VLS_StyleScopedClasses['demo__divider']} */ ;
/** @type {__VLS_StyleScopedClasses['demo__divider']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RawDataEditor: RawDataEditor,
            TransformationEngine: TransformationEngine,
            FormattedOutput: FormattedOutput,
            ProblemsAnalysis: ProblemsAnalysis,
            rawMatches: rawMatches,
            parseResults: parseResults,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

import { ref } from 'vue';
import ApiExplorer from './ApiExplorer.vue';
import ArchitecturePanel from './ArchitecturePanel.vue';
const __VLS_props = defineProps();
const tabs = [
    { id: 'api', label: 'API Explorer' },
    { id: 'arch', label: 'Architecture' },
];
const activeTab = ref('api');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "showcase" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "showcase__tabs" },
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "showcase__tab" },
        ...{ class: ({ 'showcase__tab--active': __VLS_ctx.activeTab === tab.id }) },
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "showcase__panel" },
});
if (__VLS_ctx.activeTab === 'api') {
    /** @type {[typeof ApiExplorer, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ApiExplorer, new ApiExplorer({
        matches: (__VLS_ctx.matches),
    }));
    const __VLS_1 = __VLS_0({
        matches: (__VLS_ctx.matches),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else if (__VLS_ctx.activeTab === 'arch') {
    /** @type {[typeof ArchitecturePanel, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(ArchitecturePanel, new ArchitecturePanel({}));
    const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {__VLS_StyleScopedClasses['showcase']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase__tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase__tab']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase__panel']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ApiExplorer: ApiExplorer,
            ArchitecturePanel: ArchitecturePanel,
            tabs: tabs,
            activeTab: activeTab,
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

import { ref, reactive } from 'vue';
const __VLS_props = defineProps();
const getLoading = ref(false);
const getResponse = ref(null);
const patchLoading = ref(false);
const patchResponse = ref(null);
const selectedMatch = ref('');
const newScore = ref('');
const errors = reactive({ match: '', score: '' });
const SCORE_PATTERN = /^\d+:\d+(,\d+:\d+)*$/;
function validatePatch() {
    let valid = true;
    if (!selectedMatch.value) {
        errors.match = 'Select a match';
        valid = false;
    }
    if (!newScore.value.trim()) {
        errors.score = 'Enter a score';
        valid = false;
    }
    else if (!SCORE_PATTERN.test(newScore.value.trim())) {
        errors.score = 'Format: 3:2 or 9:7,2:1';
        valid = false;
    }
    return valid;
}
function statusClass(status) {
    if (status >= 200 && status < 300)
        return 'endpoint__status--ok';
    if (status >= 400)
        return 'endpoint__status--err';
    return '';
}
async function tryGet() {
    getLoading.value = true;
    getResponse.value = null;
    const start = performance.now();
    try {
        const res = await fetch('/api/matches');
        const data = await res.json();
        getResponse.value = {
            status: res.status,
            time: Math.round(performance.now() - start),
            body: JSON.stringify(data, null, 2),
        };
    }
    catch (e) {
        getResponse.value = {
            status: 0,
            time: Math.round(performance.now() - start),
            body: String(e),
        };
    }
    finally {
        getLoading.value = false;
    }
}
async function tryPatch() {
    if (!validatePatch())
        return;
    patchLoading.value = true;
    patchResponse.value = null;
    const start = performance.now();
    try {
        const res = await fetch(`/api/matches/${selectedMatch.value}/score`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: newScore.value }),
        });
        const data = await res.json();
        patchResponse.value = {
            status: res.status,
            time: Math.round(performance.now() - start),
            body: JSON.stringify(data, null, 2),
        };
    }
    catch (e) {
        patchResponse.value = {
            status: 0,
            time: Math.round(performance.now() - start),
            body: String(e),
        };
    }
    finally {
        patchLoading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "api-explorer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint__header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "endpoint__method endpoint__method--get" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
    ...{ class: "endpoint__path" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "endpoint__desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.tryGet) },
    ...{ class: "btn btn--accent endpoint__btn" },
    disabled: (__VLS_ctx.getLoading),
});
(__VLS_ctx.getLoading ? 'Loading...' : 'Try it');
if (__VLS_ctx.getResponse) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "endpoint__response" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "endpoint__meta" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "endpoint__status" },
        ...{ class: (__VLS_ctx.statusClass(__VLS_ctx.getResponse.status)) },
    });
    (__VLS_ctx.getResponse.status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "endpoint__time" },
    });
    (__VLS_ctx.getResponse.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "endpoint__curl" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
        ...{ class: "endpoint__json" },
    });
    (__VLS_ctx.getResponse.body);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint__header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "endpoint__method endpoint__method--patch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
    ...{ class: "endpoint__path" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "endpoint__desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint__form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint__field" },
    ...{ class: ({ 'endpoint__field--error': __VLS_ctx.errors.match }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.errors.match = '';
        } },
    value: (__VLS_ctx.selectedMatch),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
    disabled: true,
});
for (const [m] of __VLS_getVForSourceType((__VLS_ctx.matches))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (m.id),
        value: (m.id),
    });
    (m.participant1);
    (m.participant2);
    (m.sport);
}
if (__VLS_ctx.errors.match) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "endpoint__error" },
    });
    (__VLS_ctx.errors.match);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "endpoint__field" },
    ...{ class: ({ 'endpoint__field--error': __VLS_ctx.errors.score }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.errors.score = '';
        } },
    value: (__VLS_ctx.newScore),
    type: "text",
    placeholder: "e.g. 3:2",
});
if (__VLS_ctx.errors.score) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "endpoint__error" },
    });
    (__VLS_ctx.errors.score);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.tryPatch) },
    ...{ class: "btn btn--accent endpoint__btn" },
    disabled: (__VLS_ctx.patchLoading),
});
(__VLS_ctx.patchLoading ? 'Sending...' : 'Send');
if (__VLS_ctx.patchResponse) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "endpoint__response" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "endpoint__meta" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "endpoint__status" },
        ...{ class: (__VLS_ctx.statusClass(__VLS_ctx.patchResponse.status)) },
    });
    (__VLS_ctx.patchResponse.status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "endpoint__time" },
    });
    (__VLS_ctx.patchResponse.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "endpoint__curl" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (__VLS_ctx.selectedMatch);
    (JSON.stringify({ score: __VLS_ctx.newScore }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
        ...{ class: "endpoint__json" },
    });
    (__VLS_ctx.patchResponse.body);
}
/** @type {__VLS_StyleScopedClasses['api-explorer']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__header']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__method']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__method--get']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__path']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn--accent']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__btn']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__response']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__meta']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__status']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__time']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__curl']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__json']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__header']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__method']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__method--patch']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__path']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__form']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__field']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__error']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__field']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__error']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn--accent']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__btn']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__response']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__meta']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__status']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__time']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__curl']} */ ;
/** @type {__VLS_StyleScopedClasses['endpoint__json']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            getLoading: getLoading,
            getResponse: getResponse,
            patchLoading: patchLoading,
            patchResponse: patchResponse,
            selectedMatch: selectedMatch,
            newScore: newScore,
            errors: errors,
            statusClass: statusClass,
            tryGet: tryGet,
            tryPatch: tryPatch,
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

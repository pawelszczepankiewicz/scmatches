import { ref, watch } from 'vue';
import { DEFAULT_RAW_MATCHES } from '../../data/defaultMatches';
const props = defineProps();
const emit = defineEmits();
const mode = ref('form');
const localMatches = ref(structuredClone(props.modelValue));
const jsonText = ref(JSON.stringify(props.modelValue, null, 2));
const jsonError = ref(null);
watch(() => props.modelValue, (val) => {
    localMatches.value = structuredClone(val);
    jsonText.value = JSON.stringify(val, null, 2);
}, { deep: true });
function emitUpdate() {
    emit('update:modelValue', structuredClone(localMatches.value));
}
function scoreToString(score) {
    if (score == null)
        return '';
    if (typeof score === 'string')
        return score;
    return JSON.stringify(score);
}
function updateScore(index, value) {
    const trimmed = value.trim();
    if (!trimmed) {
        localMatches.value[index] = { ...localMatches.value[index], score: undefined };
    }
    else if (trimmed.startsWith('[')) {
        try {
            localMatches.value[index].score = JSON.parse(trimmed);
        }
        catch {
            localMatches.value[index].score = trimmed;
        }
    }
    else {
        localMatches.value[index].score = trimmed;
    }
    emitUpdate();
}
function addMatch() {
    localMatches.value.push({ sport: '', participant1: '', participant2: '', score: '' });
    emitUpdate();
}
function removeMatch(index) {
    localMatches.value.splice(index, 1);
    emitUpdate();
}
function resetToDefault() {
    const fresh = structuredClone(DEFAULT_RAW_MATCHES);
    localMatches.value = fresh;
    emit('update:modelValue', fresh);
}
function isValid(match) {
    return !!(match.sport && match.participant1 && match.participant2 && match.score != null);
}
let jsonDebounce;
function onJsonInput(e) {
    const value = e.target.value;
    jsonText.value = value;
    clearTimeout(jsonDebounce);
    jsonDebounce = setTimeout(() => {
        try {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed))
                throw new Error('Must be an array');
            jsonError.value = null;
            localMatches.value = parsed;
            emit('update:modelValue', parsed);
        }
        catch (err) {
            jsonError.value = err instanceof Error ? err.message : 'Invalid JSON';
        }
    }, 400);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "editor" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "editor__header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "editor__title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "editor__controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "editor__mode" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.mode = 'form';
        } },
    ...{ class: "editor__mode-btn" },
    ...{ class: ({ 'editor__mode-btn--active': __VLS_ctx.mode === 'form' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.mode = 'json';
        } },
    ...{ class: "editor__mode-btn" },
    ...{ class: ({ 'editor__mode-btn--active': __VLS_ctx.mode === 'json' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.resetToDefault) },
    ...{ class: "btn btn--accent editor__reset" },
});
if (__VLS_ctx.mode === 'form') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "editor__form" },
    });
    for (const [match, i] of __VLS_getVForSourceType((__VLS_ctx.localMatches))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (i),
            ...{ class: "editor__card" },
            ...{ class: ({ 'editor__card--invalid': !__VLS_ctx.isValid(match) }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.mode === 'form'))
                        return;
                    __VLS_ctx.removeMatch(i);
                } },
            ...{ class: "editor__remove" },
            title: "Remove match",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__index" },
        });
        (i + 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__fields" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (__VLS_ctx.emitUpdate) },
            placeholder: "e.g. soccer, tennis...",
        });
        (match.sport);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (__VLS_ctx.emitUpdate) },
            placeholder: "Team or player name",
        });
        (match.participant1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (__VLS_ctx.emitUpdate) },
            placeholder: "Team or player name",
        });
        (match.participant2);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__field editor__field--score" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.mode === 'form'))
                        return;
                    __VLS_ctx.updateScore(i, $event.target.value);
                } },
            value: (__VLS_ctx.scoreToString(match.score)),
            placeholder: "e.g. 2:1 or 3:0,25:23,25:19",
        });
        if (match.sport === 'basketball') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "editor__hint" },
            });
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.addMatch) },
        ...{ class: "btn btn--primary editor__add" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "editor__json" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        ...{ onInput: (__VLS_ctx.onJsonInput) },
        ...{ class: "editor__textarea" },
        value: (__VLS_ctx.jsonText),
        spellcheck: "false",
    });
    if (__VLS_ctx.jsonError) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "editor__json-error" },
        });
        (__VLS_ctx.jsonError);
    }
}
/** @type {__VLS_StyleScopedClasses['editor']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__header']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__title']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__controls']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__mode']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__mode-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__mode-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn--accent']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__reset']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__form']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__card']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__remove']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__index']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__fields']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__field']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__field']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__field']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__field']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__field--score']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__hint']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__add']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__json']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['editor__json-error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            mode: mode,
            localMatches: localMatches,
            jsonText: jsonText,
            jsonError: jsonError,
            emitUpdate: emitUpdate,
            scoreToString: scoreToString,
            updateScore: updateScore,
            addMatch: addMatch,
            removeMatch: removeMatch,
            resetToDefault: resetToDefault,
            isValid: isValid,
            onJsonInput: onJsonInput,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */

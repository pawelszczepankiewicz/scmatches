import { ref, onMounted, onUnmounted, nextTick } from 'vue';
const props = defineProps();
const events = ref([]);
const simulateMatch = ref('');
const simulating = ref(false);
const logContainer = ref(null);
function timestamp() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false });
}
function addEvent(e) {
    events.value.push(e);
    if (events.value.length > 100)
        events.value.shift();
    nextTick(() => {
        if (logContainer.value) {
            logContainer.value.scrollTop = logContainer.value.scrollHeight;
        }
    });
}
function clearLog() {
    events.value = [];
}
function onConnect() {
    addEvent({ time: timestamp(), name: 'connect', type: 'connect' });
}
function onDisconnect() {
    addEvent({ time: timestamp(), name: 'disconnect', type: 'disconnect' });
}
function onScoreUpdate(data) {
    addEvent({
        time: timestamp(),
        name: 'score:update',
        type: 'data',
        payload: JSON.stringify(data, null, 2),
    });
}
onMounted(() => {
    props.socket.on('connect', onConnect);
    props.socket.on('disconnect', onDisconnect);
    props.socket.on('score:update', onScoreUpdate);
    if (props.connected) {
        addEvent({ time: timestamp(), name: 'connect', type: 'connect', payload: 'Already connected' });
    }
});
onUnmounted(() => {
    props.socket.off('connect', onConnect);
    props.socket.off('disconnect', onDisconnect);
    props.socket.off('score:update', onScoreUpdate);
});
async function simulateUpdate() {
    if (!simulateMatch.value)
        return;
    simulating.value = true;
    const randomA = Math.floor(Math.random() * 5);
    const randomB = Math.floor(Math.random() * 5);
    const score = `${randomA}:${randomB}`;
    addEvent({
        time: timestamp(),
        name: 'REST PATCH',
        type: 'data',
        payload: `Sending score "${score}" for match ${simulateMatch.value}`,
    });
    try {
        await fetch(`/api/matches/${simulateMatch.value}/score`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score }),
        });
    }
    catch (e) {
        addEvent({
            time: timestamp(),
            name: 'error',
            type: 'disconnect',
            payload: String(e),
        });
    }
    finally {
        simulating.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ws-monitor" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ws-monitor__toolbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ws-monitor__status" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ws-monitor__dot" },
    ...{ class: ({ 'ws-monitor__dot--on': __VLS_ctx.connected }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.connected ? 'Connected' : 'Disconnected');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ws-monitor__actions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.simulateMatch),
    ...{ class: "ws-monitor__select" },
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
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.simulateUpdate) },
    ...{ class: "btn btn--primary" },
    disabled: (!__VLS_ctx.simulateMatch || __VLS_ctx.simulating),
});
(__VLS_ctx.simulating ? 'Sending...' : 'Simulate Score Update');
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.clearLog) },
    ...{ class: "btn btn--clear" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ws-monitor__info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ws-monitor__log" },
    ref: "logContainer",
});
/** @type {typeof __VLS_ctx.logContainer} */ ;
if (__VLS_ctx.events.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ws-monitor__empty" },
    });
}
for (const [event, i] of __VLS_getVForSourceType((__VLS_ctx.events))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (i),
        ...{ class: "ws-monitor__event" },
        ...{ class: (`ws-monitor__event--${event.type}`) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ws-monitor__time" },
    });
    (event.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ws-monitor__tag" },
        ...{ class: (`ws-monitor__tag--${event.type}`) },
    });
    (event.name);
    if (event.payload) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "ws-monitor__payload" },
        });
        (event.payload);
    }
}
/** @type {__VLS_StyleScopedClasses['ws-monitor']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__status']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__dot']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__select']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn--clear']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__info']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__log']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__event']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__time']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__tag']} */ ;
/** @type {__VLS_StyleScopedClasses['ws-monitor__payload']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            events: events,
            simulateMatch: simulateMatch,
            simulating: simulating,
            logContainer: logContainer,
            clearLog: clearLog,
            simulateUpdate: simulateUpdate,
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

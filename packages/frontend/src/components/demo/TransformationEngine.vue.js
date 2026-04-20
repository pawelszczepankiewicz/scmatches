const sports = [
    { sport: 'soccer', separator: ' - ', formatter: 'passthroughFormatter' },
    { sport: 'volleyball', separator: ' - ', formatter: 'setBasedFormatter' },
    { sport: 'handball', separator: ' vs ', formatter: 'passthroughFormatter' },
    { sport: 'basketball', separator: ' - ', formatter: 'basketballFormatter' },
    { sport: 'tennis', separator: ' vs ', formatter: 'setBasedFormatter' },
];
const parseMatchCode = `function parseMatch(match: RawMatch): ParsedMatch | null {
  const config = SPORT_CONFIG[match.sport];
  if (!config || !match.participant1 || !match.participant2 || match.score == null) {
    return null;
  }

  try {
    const name = \`\${match.participant1}\${config.nameSeparator}\${match.participant2}\`;
    const score = config.formatScore(match.score);
    return { name, score };
  } catch {
    return null;
  }
}`;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "engine" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "engine__title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__pipeline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step-desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__arrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step engine__step--highlight" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step-desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__arrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__step-desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__config" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "engine__desc" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "engine__table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [s] of __VLS_getVForSourceType((__VLS_ctx.sports))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (s.sport),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (s.sport);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (s.separator);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (s.formatter);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "engine__code" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.parseMatchCode);
/** @type {__VLS_StyleScopedClasses['engine']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__title']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__pipeline']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step-label']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step--highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step-label']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step-label']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__step-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__config']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__table']} */ ;
/** @type {__VLS_StyleScopedClasses['engine__code']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            sports: sports,
            parseMatchCode: parseMatchCode,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

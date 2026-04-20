<template>
  <section class="editor">
    <div class="editor__header">
      <h2 class="editor__title">Raw Input Data</h2>
      <div class="editor__controls">
        <div class="editor__mode">
          <button
            class="editor__mode-btn"
            :class="{ 'editor__mode-btn--active': mode === 'form' }"
            @click="mode = 'form'"
          >Form</button>
          <button
            class="editor__mode-btn"
            :class="{ 'editor__mode-btn--active': mode === 'json' }"
            @click="mode = 'json'"
          >JSON</button>
        </div>
        <button class="btn btn--accent editor__reset" @click="resetToDefault">
          Reset to Original
        </button>
      </div>
    </div>

    <!-- Form Mode -->
    <div v-if="mode === 'form'" class="editor__form">
      <div
        v-for="(match, i) in localMatches"
        :key="i"
        class="editor__card"
        :class="{ 'editor__card--invalid': !isValid(match) }"
      >
        <button class="editor__remove" @click="removeMatch(i)" title="Remove match">&times;</button>
        <div class="editor__index">#{{ i + 1 }}</div>
        <div class="editor__fields">
          <div class="editor__field" :class="{ 'editor__field--error': fieldErrors(match).sport }">
            <label :for="`match-${i}-sport`">Sport</label>
            <input
              :id="`match-${i}-sport`"
              v-model="match.sport"
              placeholder="e.g. soccer, tennis..."
              @input="emitUpdate"
            />
            <span v-if="fieldErrors(match).sport" class="editor__field-error">{{ fieldErrors(match).sport }}</span>
          </div>
          <div class="editor__field" :class="{ 'editor__field--error': fieldErrors(match).participant1 }">
            <label :for="`match-${i}-p1`">Participant 1</label>
            <input
              :id="`match-${i}-p1`"
              v-model="match.participant1"
              placeholder="Team or player name"
              @input="emitUpdate"
            />
            <span v-if="fieldErrors(match).participant1" class="editor__field-error">{{ fieldErrors(match).participant1 }}</span>
          </div>
          <div class="editor__field" :class="{ 'editor__field--error': fieldErrors(match).participant2 }">
            <label :for="`match-${i}-p2`">Participant 2</label>
            <input
              :id="`match-${i}-p2`"
              v-model="match.participant2"
              placeholder="Team or player name"
              @input="emitUpdate"
            />
            <span v-if="fieldErrors(match).participant2" class="editor__field-error">{{ fieldErrors(match).participant2 }}</span>
          </div>
          <div class="editor__field editor__field--score" :class="{ 'editor__field--error': fieldErrors(match).score }">
            <label :for="`match-${i}-score`">Score</label>
            <input
              :id="`match-${i}-score`"
              :value="scoreToString(match.score)"
              @input="updateScore(i, ($event.target as HTMLInputElement).value)"
              :placeholder="scorePlaceholder(match.sport)"
            />
            <span v-if="fieldErrors(match).score" class="editor__field-error">{{ fieldErrors(match).score }}</span>
            <span v-else-if="scoreHint(match.sport)" class="editor__hint">{{ scoreHint(match.sport) }}</span>
          </div>
        </div>
        <div v-if="props.errors?.[i]?.error" class="editor__error">
          {{ props.errors[i].error }}
        </div>
      </div>

      <button class="btn btn--primary editor__add" @click="addMatch">
        + Add Match
      </button>
    </div>

    <!-- JSON Mode -->
    <div v-else class="editor__json">
      <textarea
        class="editor__textarea"
        :value="jsonText"
        @input="onJsonInput"
        spellcheck="false"
      ></textarea>
      <div v-if="jsonError" class="editor__json-error">{{ jsonError }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import type { RawMatch, Score } from '@sc-test/shared';
import { SPORT_CONFIG } from '@sc-test/shared';
import type { ParseResult } from '../../utils/parseMatchClient';
import { DEFAULT_RAW_MATCHES } from '../../data/defaultMatches';

const KNOWN_SPORTS = Object.keys(SPORT_CONFIG);

function cloneMatches(matches: RawMatch[]): RawMatch[] {
  return JSON.parse(JSON.stringify(matches));
}

const props = defineProps<{
  modelValue: RawMatch[];
  errors?: ParseResult[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: RawMatch[]];
}>();

const mode = ref<'form' | 'json'>('form');
const localMatches = ref<RawMatch[]>(cloneMatches(props.modelValue));
const jsonText = ref(JSON.stringify(props.modelValue, null, 2));
const jsonError = ref<string | null>(null);

watch(() => props.modelValue, (val) => {
  localMatches.value = cloneMatches(val);
  jsonText.value = JSON.stringify(val, null, 2);
}, { deep: true });

function emitUpdate() {
  emit('update:modelValue', cloneMatches(localMatches.value));
}

function scoreToString(score: Score | null | undefined): string {
  if (score == null) return '';
  if (typeof score === 'string') return score;
  return JSON.stringify(score);
}

function updateScore(index: number, value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    localMatches.value[index] = { ...localMatches.value[index], score: undefined };
  } else if (trimmed.startsWith('[')) {
    try {
      localMatches.value[index].score = JSON.parse(trimmed) as Score;
    } catch {
      localMatches.value[index].score = trimmed;
    }
  } else {
    localMatches.value[index].score = trimmed;
  }
  emitUpdate();
}

function addMatch() {
  localMatches.value = [...localMatches.value, { sport: '', participant1: '', participant2: '', score: '' }];
  emitUpdate();
}

function removeMatch(index: number) {
  localMatches.value = localMatches.value.filter((_, i) => i !== index);
  emitUpdate();
}

function resetToDefault() {
  const fresh = cloneMatches(DEFAULT_RAW_MATCHES);
  localMatches.value = fresh;
  emit('update:modelValue', fresh);
}

interface FieldErrors {
  sport: string;
  participant1: string;
  participant2: string;
  score: string;
}

function validateScore(score: Score | null | undefined, sport: string): string {
  if (score == null || score === '') return 'Required';
  const config = SPORT_CONFIG[sport];
  if (!config) return '';

  if (sport === 'basketball') {
    if (!Array.isArray(score)) return 'Must be a 2D array, e.g. [["9:7","2:1"]]';
    const flat = (score as string[][]).flat();
    if (flat.length === 0) return 'Array must not be empty';
    if (!flat.every(s => /^\d+:\d+$/.test(s))) return 'Each entry must be digits:digits';
    return '';
  }

  if (typeof score !== 'string') return 'Must be a string';

  if (sport === 'volleyball' || sport === 'tennis') {
    const parts = score.split(',');
    if (parts.length < 2) return 'Format: main,set1,set2… e.g. 3:0,25:23,25:19';
    if (!parts.every(p => /^\d+:\d+$/.test(p.trim()))) return 'Each part must be digits:digits';
    return '';
  }

  // soccer, handball — simple passthrough
  if (!/^\d+:\d+$/.test(score.trim())) return 'Format: digits:digits e.g. 2:1';
  return '';
}

function fieldErrors(match: RawMatch): FieldErrors {
  return {
    sport: !match.sport ? 'Required' : (!KNOWN_SPORTS.includes(match.sport) ? `Unknown (valid: ${KNOWN_SPORTS.join(', ')})` : ''),
    participant1: !match.participant1 ? 'Required' : '',
    participant2: !match.participant2 ? 'Required' : '',
    score: validateScore(match.score, match.sport),
  };
}

function scorePlaceholder(sport: string): string {
  switch (sport) {
    case 'volleyball':
    case 'tennis':
      return 'e.g. 3:0,25:23,25:19,25:21';
    case 'basketball':
      return '[["9:7","2:1"],["5:3","9:9"]]';
    case 'soccer':
    case 'handball':
      return 'e.g. 2:1';
    default:
      return 'e.g. 2:1';
  }
}

function scoreHint(sport: string): string {
  switch (sport) {
    case 'volleyball':
    case 'tennis':
      return 'main,set1,set2… (comma-separated)';
    case 'basketball':
      return '2D array: [["q1","q2"],["q3","q4"]]';
    default:
      return '';
  }
}

function isValid(match: RawMatch): boolean {
  const errs = fieldErrors(match);
  return !errs.sport && !errs.participant1 && !errs.participant2 && !errs.score;
}

const jsonDebounce = ref<ReturnType<typeof setTimeout>>();
onBeforeUnmount(() => clearTimeout(jsonDebounce.value));

function onJsonInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value;
  jsonText.value = value;
  clearTimeout(jsonDebounce.value);
  jsonDebounce.value = setTimeout(() => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error('Must be an array');
      jsonError.value = null;
      localMatches.value = parsed;
      emit('update:modelValue', parsed);
    } catch (err) {
      jsonError.value = err instanceof Error ? err.message : 'Invalid JSON';
    }
  }, 400);
}
</script>

<style scoped lang="scss">
.editor {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $space-lg;
    flex-wrap: wrap;
    gap: $space-sm;
  }

  &__title {
    font-size: 1.25rem;
    margin: 0;
  }

  &__controls {
    display: flex;
    gap: $space-sm;
    align-items: center;
    flex-wrap: wrap;
  }

  &__mode {
    display: flex;
    background: $sc-dark;
    border-radius: $radius-sm;
    overflow: hidden;
  }

  &__mode-btn {
    padding: $space-xs $space-md;
    border: none;
    background: transparent;
    color: rgba($sc-white, 0.5);
    font-family: $font-body;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;

    &--active {
      background: $sc-green;
      color: $sc-dark;
    }
  }

  &__reset {
    font-size: 12px;
    padding: $space-xs $space-sm;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  &__card {
    @include card;
    padding: $space-md;
    position: relative;
    border-left: 3px solid $sc-green;
    transition: border-color 0.2s;

    &--invalid {
      border-left-color: $sc-red;
    }
  }

  &__error {
    margin-top: $space-sm;
    padding: $space-xs $space-sm;
    background: rgba($sc-red, 0.06);
    border-left: 2px solid $sc-red;
    border-radius: $radius-sm;
    font-size: 12px;
    font-weight: 600;
    color: $sc-red;
  }

  &__remove {
    position: absolute;
    top: $space-xs;
    right: $space-sm;
    background: none;
    border: none;
    font-size: 20px;
    color: $sc-gray;
    cursor: pointer;
    line-height: 1;

    &:hover { color: $sc-red; }
  }

  &__index {
    font-size: 11px;
    font-weight: 700;
    color: $sc-gray;
    text-transform: uppercase;
    margin-bottom: $space-sm;
  }

  &__fields {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: $space-sm;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &--score {
      position: relative;
    }

    &--error {
      label { color: $sc-red; }
      input { border-color: $sc-red; }
    }

    label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: $sc-gray;
    }

    input {
      padding: $space-xs $space-sm;
      border: 1px solid $sc-gray-border;
      border-radius: $radius-sm;
      font-family: $font-body;
      font-size: 13px;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: $sc-purple-light;
      }
    }
  }

  &__field-error {
    font-size: 10px;
    font-weight: 600;
    color: $sc-red;
  }

  &__hint {
    font-size: 10px;
    color: $sc-gray;
  }

  &__add {
    align-self: flex-start;
    font-size: 13px;
    padding: $space-xs $space-md;
  }

  &__json {
    position: relative;
  }

  &__textarea {
    width: 100%;
    min-height: 300px;
    padding: $space-md;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.6;
    background: $sc-dark;
    color: $sc-green;
    border: none;
    border-radius: $radius-md;
    resize: vertical;

    &:focus { outline: 2px solid $sc-purple-light; }
  }

  &__json-error {
    margin-top: $space-xs;
    color: $sc-red;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>

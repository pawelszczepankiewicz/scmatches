<template>
  <div class="api-explorer">
    <!-- GET /api/matches -->
    <div class="endpoint">
      <div class="endpoint__header">
        <span class="endpoint__method endpoint__method--get">GET</span>
        <code class="endpoint__path">/api/matches</code>
        <span class="endpoint__desc">Fetch all parsed matches</span>
        <button class="btn btn--accent endpoint__btn" @click="tryGet" :disabled="getLoading">
          {{ getLoading ? 'Loading...' : 'Try it' }}
        </button>
      </div>
      <div v-if="getResponse" class="endpoint__response">
        <div class="endpoint__meta">
          <span class="endpoint__status" :class="statusClass(getResponse.status)">
            {{ getResponse.status }}
          </span>
          <span class="endpoint__time">{{ getResponse.time }}ms</span>
        </div>
        <div class="endpoint__curl">
          <code>fetch('/api/matches')</code>
        </div>
        <pre class="endpoint__json">{{ getResponse.body }}</pre>
      </div>
    </div>

    <!-- PATCH /api/matches/:id/score -->
    <div class="endpoint">
      <div class="endpoint__header">
        <span class="endpoint__method endpoint__method--patch">PATCH</span>
        <code class="endpoint__path">/api/matches/:id/score</code>
        <span class="endpoint__desc">Update a match score (triggers WebSocket broadcast)</span>
      </div>
      <div class="endpoint__form">
        <div class="endpoint__field" :class="{ 'endpoint__field--error': errors.match }">
          <label>Match</label>
          <select v-model="selectedMatch" @change="errors.match = ''">
            <option value="" disabled>Select a match...</option>
            <option v-for="m in matches" :key="m.id" :value="m.id">
              {{ m.participant1 }} vs {{ m.participant2 }} ({{ m.sport }})
            </option>
          </select>
          <span v-if="errors.match" class="endpoint__error">{{ errors.match }}</span>
        </div>
        <div class="endpoint__field" :class="{ 'endpoint__field--error': errors.score }">
          <label>New Score</label>
          <input
            v-model="newScore"
            type="text"
            placeholder="e.g. 3:2"
            @input="errors.score = ''"
          />
          <span v-if="errors.score" class="endpoint__error">{{ errors.score }}</span>
        </div>
        <button
          class="btn btn--accent endpoint__btn"
          @click="tryPatch"
          :disabled="patchLoading"
        >
          {{ patchLoading ? 'Sending...' : 'Send' }}
        </button>
      </div>
      <div v-if="patchResponse" class="endpoint__response">
        <div class="endpoint__meta">
          <span class="endpoint__status" :class="statusClass(patchResponse.status)">
            {{ patchResponse.status }}
          </span>
          <span class="endpoint__time">{{ patchResponse.time }}ms</span>
        </div>
        <div class="endpoint__curl">
          <code>fetch('/api/matches/{{ selectedMatch }}/score', { method: 'PATCH', body: {{ JSON.stringify({ score: newScore }) }} })</code>
        </div>
        <pre class="endpoint__json">{{ patchResponse.body }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ParsedMatch } from '@sc-test/shared';

defineProps<{
  matches: ParsedMatch[];
}>();

interface ApiResponse {
  status: number;
  time: number;
  body: string;
}

const getLoading = ref(false);
const getResponse = ref<ApiResponse | null>(null);
const patchLoading = ref(false);
const patchResponse = ref<ApiResponse | null>(null);
const selectedMatch = ref('');
const newScore = ref('');
const errors = reactive({ match: '', score: '' });

const SCORE_PATTERN = /^\d+:\d+(,\d+:\d+)*$/;

function validatePatch(): boolean {
  let valid = true;
  if (!selectedMatch.value) {
    errors.match = 'Select a match';
    valid = false;
  }
  if (!newScore.value.trim()) {
    errors.score = 'Enter a score';
    valid = false;
  } else if (!SCORE_PATTERN.test(newScore.value.trim())) {
    errors.score = 'Format: 3:2 or 9:7,2:1';
    valid = false;
  }
  return valid;
}

function statusClass(status: number) {
  if (status >= 200 && status < 300) return 'endpoint__status--ok';
  if (status >= 400) return 'endpoint__status--err';
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
  } catch (e) {
    getResponse.value = {
      status: 0,
      time: Math.round(performance.now() - start),
      body: String(e),
    };
  } finally {
    getLoading.value = false;
  }
}

async function tryPatch() {
  if (!validatePatch()) return;
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
  } catch (e) {
    patchResponse.value = {
      status: 0,
      time: Math.round(performance.now() - start),
      body: String(e),
    };
  } finally {
    patchLoading.value = false;
  }
}
</script>

<style scoped lang="scss">
.api-explorer {
  display: flex;
  flex-direction: column;
  gap: $space-lg;
}

.endpoint {
  @include card;
  padding: $space-lg;

  @include mobile {
    padding: $space-md;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: $space-sm;
    flex-wrap: wrap;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: $space-xs;
    }
  }

  &__method {
    padding: 2px $space-sm;
    border-radius: $radius-sm;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: $sc-white;

    &--get { background: #22C55E; }
    &--patch { background: #F59E0B; }
  }

  &__path {
    font-size: 14px;
    font-weight: 600;
    color: $sc-dark;
  }

  &__desc {
    font-size: 12px;
    color: $sc-gray;
    flex: 1;
  }

  &__btn {
    margin-left: auto;
    padding: $space-xs $space-md;
    font-size: 12px;

    @include mobile {
      margin-left: 0;
      width: 100%;
      justify-content: center;
    }
  }

  &__form {
    display: flex;
    align-items: flex-end;
    gap: $space-md;
    margin-top: $space-md;
    flex-wrap: wrap;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
      gap: $space-sm;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $space-xs;

    @include mobile {
      width: 100%;
    }

    label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: $sc-gray;
    }

    select, input {
      padding: $space-xs $space-sm;
      border: 1px solid darken($sc-gray-light, 10%);
      border-radius: $radius-sm;
      font-family: $font-body;
      font-size: 13px;
      background: $sc-white;
      min-width: 180px;
      transition: border-color 0.2s;

      @include mobile {
        min-width: 0;
        width: 100%;
        font-size: 16px;
      }

      &:focus {
        outline: 2px solid $sc-green;
        outline-offset: -1px;
      }
    }

    &--error {
      select, input {
        border-color: $sc-red;
      }

      label {
        color: $sc-red;
      }
    }
  }

  &__error {
    font-size: 11px;
    font-weight: 600;
    color: $sc-red;
  }

  &__response {
    margin-top: $space-md;
    border-top: 1px solid $sc-gray-light;
    padding-top: $space-md;
  }

  &__meta {
    display: flex;
    gap: $space-sm;
    margin-bottom: $space-sm;
  }

  &__status {
    padding: 1px $space-sm;
    border-radius: $radius-sm;
    font-size: 12px;
    font-weight: 700;

    &--ok { background: #DCFCE7; color: #166534; }
    &--err { background: #FEE2E2; color: #991B1B; }
  }

  &__time {
    font-size: 12px;
    color: $sc-gray;
    font-variant-numeric: tabular-nums;
  }

  &__curl {
    margin-bottom: $space-sm;

    code {
      font-size: 12px;
      background: $sc-dark;
      color: $sc-green;
      padding: $space-xs $space-sm;
      border-radius: $radius-sm;
      display: inline-block;
      max-width: 100%;
      overflow-x: auto;
    }
  }

  &__json {
    background: $sc-dark;
    color: $sc-green;
    padding: $space-md;
    border-radius: $radius-md;
    font-size: 12px;
    line-height: 1.5;
    overflow-x: auto;
    max-height: 300px;
    overflow-y: auto;
    margin: 0;

    @include mobile {
      font-size: 11px;
      padding: $space-sm;
      max-height: 200px;
    }
  }
}
</style>

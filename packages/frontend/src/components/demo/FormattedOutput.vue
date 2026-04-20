<template>
  <section class="output">
    <h2 class="output__title">Formatted Output</h2>

    <div class="output__layout">
      <!-- Visual cards -->
      <div class="output__cards">
        <h3>Parsed Matches</h3>
        <div v-if="validResults.length === 0" class="output__empty">
          No valid matches to display. Edit the input above.
        </div>
        <div class="output__grid">
          <MatchCard
            v-for="result in validResults"
            :key="result.id"
            :match="result"
          />
        </div>

        <!-- Filtered out -->
        <div v-if="filteredOut.length > 0" class="output__filtered">
          <h4>Filtered Out</h4>
          <div
            v-for="(item, i) in filteredOut"
            :key="i"
            class="output__filtered-card"
          >
            <span class="output__filtered-sport">{{ item.sport || '(empty)' }}</span>
            <span class="output__filtered-reason">{{ item.error }}</span>
          </div>
        </div>
      </div>

      <!-- Console output -->
      <div class="output__console">
        <h3>console.log(matchesParsed)</h3>
        <pre class="output__pre"><code>{{ consoleOutput }}</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RawMatch, ParsedMatch } from '@sc-test/shared';
import type { ParseResult } from '../../utils/parseMatchClient';
import MatchCard from '../MatchCard.vue';

const props = defineProps<{
  results: ParseResult[];
  rawMatches: RawMatch[];
}>();

const validResults = computed<ParsedMatch[]>(() =>
  props.results
    .map(r => r.parsed)
    .filter((p): p is ParsedMatch => p !== null)
);

const filteredOut = computed(() =>
  props.results
    .map((r, i) => ({ ...r, sport: props.rawMatches[i]?.sport }))
    .filter(r => r.parsed === null)
);

const consoleOutput = computed(() => {
  const simple = validResults.value.map(m => ({
    name: m.name,
    score: m.score,
  }));
  return JSON.stringify(simple, null, 2);
});
</script>

<style scoped lang="scss">
.output {
  &__title {
    font-size: 1.25rem;
    margin-bottom: $space-lg;
  }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-xl;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__cards {
    h3 {
      font-size: 14px;
      margin-bottom: $space-md;
    }
  }

  &__empty {
    color: $sc-gray;
    font-size: 13px;
    padding: $space-lg;
    text-align: center;
    background: $sc-gray-light;
    border-radius: $radius-md;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  &__filtered {
    margin-top: $space-lg;

    h4 {
      font-size: 12px;
      text-transform: uppercase;
      color: $sc-gray;
      margin-bottom: $space-sm;
    }
  }

  &__filtered-card {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-sm $space-md;
    background: rgba($sc-red, 0.06);
    border-left: 3px solid $sc-red;
    border-radius: $radius-sm;
    margin-bottom: $space-xs;
    font-size: 13px;
  }

  &__filtered-sport {
    font-weight: 700;
    color: $sc-dark;
  }

  &__filtered-reason {
    color: $sc-red;
    font-size: 12px;
  }

  &__console {
    h3 {
      font-size: 14px;
      font-family: monospace;
      margin-bottom: $space-md;
      color: $sc-gray;
    }
  }

  &__pre {
    background: $sc-dark;
    color: $sc-green;
    padding: $space-md;
    border-radius: $radius-md;
    font-size: 12px;
    line-height: 1.6;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 500px;
    overflow-y: auto;
    word-break: break-word;

    @include mobile {
      font-size: 11px;
      padding: $space-sm;
      max-height: 300px;
    }
  }
}
</style>

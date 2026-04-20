<template>
  <div class="match-card" :class="`match-card--${match.sport}`">
    <div class="match-card__header">
      <span class="match-card__sport-label">{{ match.sport }}</span>
      <span v-if="match.isLive" class="match-card__period">LIVE</span>
    </div>
    <div class="match-card__scoreboard">
      <div class="match-card__row">
        <span class="match-card__team">{{ match.participant1 }}</span>
        <span class="match-card__team-score">{{ mainScores[0] }}</span>
      </div>
      <div class="match-card__row">
        <span class="match-card__team">{{ match.participant2 }}</span>
        <span class="match-card__team-score">{{ mainScores[1] }}</span>
      </div>
    </div>
    <ScoreDisplay
      v-if="hasSetDetails"
      :score="match.score"
      :sport="match.sport"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ParsedMatch } from '@sc-test/shared';
import ScoreDisplay from './ScoreDisplay.vue';

const props = defineProps<{
  match: ParsedMatch;
}>();

const mainScores = computed(() => {
  const raw = props.match.score;

  // Set-based format: "Main score: 3:0 (set1 ...)"
  if (raw.startsWith('Main score:')) {
    const m = raw.match(/Main score:\s*(\d+):(\d+)/);
    return m ? [m[1], m[2]] : [raw, ''];
  }

  // Basketball: "9:7,2:1,5:3,9:9" — show total or first pair
  if (props.match.sport === 'basketball') {
    // Sum all quarter scores per team
    const quarters = raw.split(',');
    let t1 = 0, t2 = 0;
    for (const q of quarters) {
      const [a, b] = q.split(':').map(Number);
      t1 += a; t2 += b;
    }
    return [String(t1), String(t2)];
  }

  // Simple format: "2:1"
  const parts = raw.split(':');
  if (parts.length === 2) {
    return [parts[0].trim(), parts[1].trim()];
  }
  return [raw, ''];
});

const hasSetDetails = computed(() => {
  return props.match.sport === 'volleyball'
    || props.match.sport === 'tennis'
    || props.match.sport === 'basketball';
});
</script>

<style scoped lang="scss">
.match-card {
  @include card;
  padding: 0;
  border-left: 4px solid $sc-green;
  min-height: $card-min-height;
  display: flex;
  flex-direction: column;

  &--soccer { border-left-color: #22C55E; }
  &--volleyball { border-left-color: #F59E0B; }
  &--handball { border-left-color: #3B82F6; }
  &--basketball { border-left-color: #EF4444; }
  &--tennis { border-left-color: $sc-green; }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-sm $space-md;
    border-bottom: 1px solid rgba($sc-dark, 0.06);
  }

  &__sport-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $sc-gray;
  }

  &__period {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $sc-red;
    animation: pulse 2s infinite;
  }

  &__scoreboard {
    padding: $space-md;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    flex: 1;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-md;
  }

  &__team {
    font-weight: 600;
    font-size: 0.9375rem;
    color: $sc-dark;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  &__team-score {
    font-size: $score-main-size;
    font-weight: 800;
    color: $sc-dark;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    min-width: 2ch;
    text-align: right;

    @include mobile {
      font-size: 1.375rem;
    }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>

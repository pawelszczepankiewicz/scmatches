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
import { computed } from "vue";
import type { ParsedMatch } from "@sc-test/shared";
import ScoreDisplay from "./ScoreDisplay.vue";
import { parseMainScores, parseSetDetails } from "../utils/scoreParser";

const props = defineProps<{
  match: ParsedMatch;
}>();

const mainScores = computed(() =>
  parseMainScores(props.match.score, props.match.sport),
);

const hasSetDetails = computed(() =>
  parseSetDetails(props.match.score, props.match.sport).length > 0,
);
</script>

<style scoped lang="scss">
.match-card {
  @include card;
  padding: 0;
  border-left: 4px solid $sc-green;
  min-height: $card-min-height;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;

  &--soccer {
    border-left-color: #22c55e;
  }
  &--volleyball {
    border-left-color: #f59e0b;
  }
  &--handball {
    border-left-color: #3b82f6;
  }
  &--basketball {
    border-left-color: #ef4444;
  }
  &--tennis {
    border-left-color: $sc-green;
  }

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
    min-width: 0;

    @include mobile {
      padding: $space-sm $space-md;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-sm;
    min-width: 0;
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
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>

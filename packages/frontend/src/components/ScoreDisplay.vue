<template>
  <div v-if="details.length > 0" class="score-display">
    <div
      v-for="(detail, index) in details"
      :key="index"
      class="score-display__set"
    >
      <span class="score-display__set-label">{{ detail.label }}</span>
      <span class="score-display__set-value">{{ detail.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  score: string;
  sport: string;
}>();

interface ScoreDetail {
  label: string;
  value: string;
}

const details = computed((): ScoreDetail[] => {
  const raw = props.score;

  // Set-based sports (tennis, volleyball): "Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)"
  const parenMatch = raw.match(/\((.+)\)/);
  if (parenMatch) {
    return parenMatch[1]
      .split(',')
      .map((s, i) => ({
        label: `S${i + 1}`,
        value: s.replace(/set\d+\s*/, '').trim(),
      }))
      .filter(d => d.value.length > 0);
  }

  // Basketball: "9:7,2:1,5:3,9:9" — show as quarters
  if (props.sport === 'basketball') {
    return raw.split(',').map((q, i) => ({
      label: `Q${i + 1}`,
      value: q.trim(),
    }));
  }

  return [];
});
</script>

<style scoped lang="scss">
.score-display {
  display: flex;
  gap: $space-xs;
  padding: $space-sm $space-md;
  border-top: 1px solid rgba($sc-dark, 0.06);
  background: rgba($sc-dark, 0.02);

  &__set {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 36px;
  }

  &__set-label {
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    color: $sc-gray;
    letter-spacing: 0.05em;
  }

  &__set-value {
    font-size: $score-set-size;
    font-weight: 700;
    color: $sc-dark;
    font-variant-numeric: tabular-nums;
  }
}
</style>

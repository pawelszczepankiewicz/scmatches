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
import { computed } from "vue";
import { parseSetDetails } from "../utils/scoreParser";

const props = defineProps<{
  score: string;
  sport: string;
}>();

const details = computed(() => parseSetDetails(props.score, props.sport));
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

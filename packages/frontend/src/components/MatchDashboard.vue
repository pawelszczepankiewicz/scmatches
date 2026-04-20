<template>
  <div class="dashboard">
    <div v-if="loading" class="dashboard__loading">
      Loading matches...
    </div>
    <div v-else-if="error" class="dashboard__error">
      {{ error }}
    </div>
    <div v-else class="dashboard__grid">
      <MatchCard
        v-for="match in matches"
        :key="match.id"
        :match="match"
      />
    </div>
    <p v-if="!loading && matches.length === 0 && !error" class="dashboard__empty">
      No live matches right now.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ParsedMatch } from '@sc-test/shared';
import MatchCard from './MatchCard.vue';

defineProps<{
  matches: ParsedMatch[];
  loading: boolean;
  error: string | null;
}>();
</script>

<style scoped lang="scss">
.dashboard {
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $space-lg;
    align-items: start;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__loading,
  &__error,
  &__empty {
    text-align: center;
    padding: $space-2xl;
    font-size: 1rem;
    color: $sc-gray;
  }

  &__error {
    color: $sc-red;
  }
}
</style>

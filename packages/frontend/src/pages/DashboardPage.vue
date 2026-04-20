<template>
  <MatchDashboard :matches="matches" :loading="loading" :error="error" />
</template>

<script setup lang="ts">
import MatchDashboard from '../components/MatchDashboard.vue';
import { useMatches } from '../composables/useMatches';

const { matches, loading, error } = useMatches();
</script>

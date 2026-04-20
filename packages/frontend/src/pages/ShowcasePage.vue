<template>
  <ShowcaseSection :socket="socket" :connected="connected" :matches="matches" />
</template>

<script setup lang="ts">
import ShowcaseSection from '../components/showcase/ShowcaseSection.vue';
import { useMatches } from '../composables/useMatches';

const { matches, connected, socket } = useMatches();
</script>

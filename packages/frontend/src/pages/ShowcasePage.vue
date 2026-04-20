<template>
  <ShowcaseSection :matches="matches" />
</template>

<script setup lang="ts">
import ShowcaseSection from '../components/showcase/ShowcaseSection.vue';
import { useMatches } from '../composables/useMatches';

const { matches } = useMatches();
</script>

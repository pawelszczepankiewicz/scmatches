<template>
  <AppNav />
  <section class="hero">
    <div class="hero__inner">
      <h1 class="hero__title">{{ pageTitle }}</h1>
    </div>
  </section>
  <main class="page-container">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppNav from './components/AppNav.vue';

const route = useRoute();

const pageTitle = computed(() => (route.meta.title as string) || 'Dashboard');
</script>

<style scoped lang="scss">
.hero {
  background: $sc-green;
  padding: $space-xl 0;
  margin-bottom: $space-xl;

  &__inner {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-md;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-md;
    flex-wrap: wrap;
  }

  &__title {
    font-family: $font-display;
    font-size: 3rem;
    font-weight: 800;
    text-transform: uppercase;
    color: $sc-purple;
    line-height: 1.1;
    letter-spacing: -0.02em;

    @include mobile {
      font-size: 2rem;
    }
  }
}
</style>

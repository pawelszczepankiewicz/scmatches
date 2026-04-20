<template>
  <AppNav :connected="connected" />
  <section class="hero">
    <div class="hero__inner">
      <h1 class="hero__title">{{ pageTitle }}</h1>
      <div class="hero__status">
        <span
          class="hero__dot"
          :class="{ 'hero__dot--connected': connected }"
        ></span>
        <span class="hero__label">
          {{ connected ? 'Live' : 'Connecting...' }}
        </span>
      </div>
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
import { useSocket } from './composables/useSocket';

const { connected } = useSocket();
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

  &__status {
    display: flex;
    align-items: center;
    gap: $space-xs;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $sc-red;
    transition: background 0.3s;

    &--connected {
      background: $sc-dark;
      box-shadow: 0 0 0 3px rgba($sc-dark, 0.2);
      animation: pulse 2s infinite;
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: $sc-dark;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

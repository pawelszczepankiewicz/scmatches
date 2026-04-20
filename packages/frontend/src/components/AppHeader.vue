<template>
  <header class="app-header">
    <div class="app-header__accent"></div>
    <div class="app-header__content">
      <h1 class="app-header__title">STATSCORE</h1>
      <span class="app-header__subtitle">Live Match Dashboard</span>
      <div class="app-header__status">
        <span
          class="app-header__dot"
          :class="{ 'app-header__dot--connected': connected }"
        ></span>
        <span class="app-header__label">
          {{ connected ? 'Live' : 'Connecting...' }}
        </span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  connected: boolean;
}>();
</script>

<style scoped lang="scss">
.app-header {
  margin-bottom: $space-xl;

  &__accent {
    height: 4px;
    background: linear-gradient(90deg, $sc-green, $sc-magenta);
    border-radius: $radius-sm $radius-sm 0 0;
  }

  &__content {
    display: flex;
    align-items: baseline;
    gap: $space-md;
    padding: $space-lg 0;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 2.5rem;
    margin: 0;
  }

  &__subtitle {
    font-family: $font-body;
    font-size: 1rem;
    color: $sc-gray;
    font-weight: 500;
  }

  &__status {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: $space-xs;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $sc-red;
    transition: background 0.3s;

    &--connected {
      background: $sc-green;
      box-shadow: 0 0 0 3px rgba($sc-green, 0.25);
      animation: pulse 2s infinite;
    }
  }

  &__label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: $sc-green-accessible;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

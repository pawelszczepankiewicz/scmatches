<template>
  <span v-if="isLive" class="live-indicator">
    <span class="live-indicator__dot"></span>
    LIVE
  </span>
</template>

<script setup lang="ts">
defineProps<{
  isLive: boolean;
}>();
</script>

<style scoped lang="scss">
.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: $space-xs;
  padding: 2px $space-sm;
  background: $sc-red;
  color: $sc-white;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: $radius-sm;
  letter-spacing: 0.05em;

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $sc-white;
    animation: blink 1.5s infinite;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>

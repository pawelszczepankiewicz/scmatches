<template>
  <section class="showcase">
    <nav class="showcase__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="showcase__tab"
        :class="{ 'showcase__tab--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>

    <div class="showcase__panel">
      <ApiExplorer v-if="activeTab === 'api'" :matches="matches" />
      <WebSocketMonitor
        v-else-if="activeTab === 'ws'"
        :socket="socket"
        :connected="connected"
        :matches="matches"
      />
      <ArchitecturePanel v-else-if="activeTab === 'arch'" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Socket } from 'socket.io-client';
import type { ParsedMatch } from '@sc-test/shared';
import ApiExplorer from './ApiExplorer.vue';
import WebSocketMonitor from './WebSocketMonitor.vue';
import ArchitecturePanel from './ArchitecturePanel.vue';

defineProps<{
  socket: Socket;
  connected: boolean;
  matches: ParsedMatch[];
}>();

const tabs = [
  { id: 'api', label: 'API Explorer' },
  { id: 'ws', label: 'WebSocket Monitor' },
  { id: 'arch', label: 'Architecture' },
];

const activeTab = ref('api');
</script>

<style scoped lang="scss">
.showcase {
  padding-top: $space-md;

  &__tabs {
    display: flex;
    gap: $space-sm;
    margin-bottom: $space-xl;
    padding: $space-xs;
    background: $sc-dark;
    border-radius: $radius-md;

    @include mobile {
      gap: $space-xs;
    }
  }

  &__tab {
    flex: 1;
    padding: $space-sm $space-md;
    border: none;
    background: transparent;
    font-family: $font-body;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: rgba($sc-white, 0.5);
    cursor: pointer;
    border-radius: $radius-sm;
    transition: all 0.2s;
    text-align: center;

    &:hover {
      color: $sc-white;
      background: rgba($sc-white, 0.08);
    }

    &--active {
      color: $sc-dark;
      background: $sc-green;
    }

    @include mobile {
      padding: $space-sm $space-xs;
      font-size: 11px;
      letter-spacing: 0;
    }
  }

  &__panel {
    min-height: 200px;
  }
}
</style>

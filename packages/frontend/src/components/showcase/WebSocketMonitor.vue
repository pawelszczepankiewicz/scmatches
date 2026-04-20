<template>
  <div class="ws-monitor">
    <div class="ws-monitor__toolbar">
      <div class="ws-monitor__status">
        <span class="ws-monitor__dot" :class="{ 'ws-monitor__dot--on': connected }"></span>
        <span>{{ connected ? 'Connected' : 'Disconnected' }}</span>
      </div>
      <div class="ws-monitor__actions">
        <select v-model="simulateMatch" class="ws-monitor__select">
          <option value="" disabled>Pick match...</option>
          <option v-for="m in matches" :key="m.id" :value="m.id">
            {{ m.participant1 }} vs {{ m.participant2 }}
          </option>
        </select>
        <button
          class="btn btn--primary"
          @click="simulateUpdate"
          :disabled="!simulateMatch || simulating"
        >
          {{ simulating ? 'Sending...' : 'Simulate Score Update' }}
        </button>
        <button class="btn btn--clear" @click="clearLog">Clear</button>
      </div>
    </div>

    <div class="ws-monitor__info">
      Click "Simulate Score Update" to trigger: REST PATCH &rarr; Backend &rarr; WebSocket broadcast &rarr; UI update
    </div>

    <div class="ws-monitor__log" ref="logContainer">
      <div v-if="events.length === 0" class="ws-monitor__empty">
        Waiting for WebSocket events...
      </div>
      <div
        v-for="(event, i) in events"
        :key="i"
        class="ws-monitor__event"
        :class="`ws-monitor__event--${event.type}`"
      >
        <span class="ws-monitor__time">{{ event.time }}</span>
        <span class="ws-monitor__tag" :class="`ws-monitor__tag--${event.type}`">
          {{ event.name }}
        </span>
        <span v-if="event.payload" class="ws-monitor__payload">
          {{ event.payload }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import type { Socket } from 'socket.io-client';
import type { ParsedMatch } from '@sc-test/shared';

const props = defineProps<{
  socket: Socket;
  connected: boolean;
  matches: ParsedMatch[];
}>();

interface WsEvent {
  time: string;
  name: string;
  type: 'connect' | 'disconnect' | 'data';
  payload?: string;
}

const events = ref<WsEvent[]>([]);
const simulateMatch = ref('');
const simulating = ref(false);
const logContainer = ref<HTMLElement | null>(null);

function timestamp() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

function addEvent(e: WsEvent) {
  events.value.push(e);
  if (events.value.length > 100) events.value.shift();
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
}

function clearLog() {
  events.value = [];
}

function onConnect() {
  addEvent({ time: timestamp(), name: 'connect', type: 'connect' });
}

function onDisconnect() {
  addEvent({ time: timestamp(), name: 'disconnect', type: 'disconnect' });
}

function onScoreUpdate(data: ParsedMatch) {
  addEvent({
    time: timestamp(),
    name: 'score:update',
    type: 'data',
    payload: JSON.stringify(data, null, 2),
  });
}

onMounted(() => {
  props.socket.on('connect', onConnect);
  props.socket.on('disconnect', onDisconnect);
  props.socket.on('score:update', onScoreUpdate);

  if (props.connected) {
    addEvent({ time: timestamp(), name: 'connect', type: 'connect', payload: 'Already connected' });
  }
});

onUnmounted(() => {
  props.socket.off('connect', onConnect);
  props.socket.off('disconnect', onDisconnect);
  props.socket.off('score:update', onScoreUpdate);
});

async function simulateUpdate() {
  if (!simulateMatch.value) return;
  simulating.value = true;

  const randomA = Math.floor(Math.random() * 5);
  const randomB = Math.floor(Math.random() * 5);
  const score = `${randomA}:${randomB}`;

  addEvent({
    time: timestamp(),
    name: 'REST PATCH',
    type: 'data',
    payload: `Sending score "${score}" for match ${simulateMatch.value}`,
  });

  try {
    await fetch(`/api/matches/${simulateMatch.value}/score`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score }),
    });
  } catch (e) {
    addEvent({
      time: timestamp(),
      name: 'error',
      type: 'disconnect',
      payload: String(e),
    });
  } finally {
    simulating.value = false;
  }
}
</script>

<style scoped lang="scss">
.ws-monitor {
  display: flex;
  flex-direction: column;
  gap: $space-md;

  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: $space-sm;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__status {
    display: flex;
    align-items: center;
    gap: $space-xs;
    font-size: 13px;
    font-weight: 600;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $sc-red;

    &--on {
      background: $sc-green;
      animation: pulse 2s infinite;
    }
  }

  &__actions {
    display: flex;
    gap: $space-sm;
    align-items: center;
    flex-wrap: wrap;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__select {
    padding: $space-xs $space-sm;
    border: 1px solid darken($sc-gray-light, 10%);
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: 13px;
    min-width: 160px;

    @include mobile {
      min-width: 0;
      width: 100%;
      font-size: 16px;
    }
  }

  .btn {
    padding: $space-xs $space-md;
    font-size: 12px;

    @include mobile {
      width: 100%;
      justify-content: center;
    }
  }

  .btn--clear {
    background: transparent;
    color: $sc-gray;
    border: 1px solid darken($sc-gray-light, 10%);

    &:hover { background: $sc-gray-light; }
  }

  &__info {
    font-size: 12px;
    color: $sc-gray;
    padding: $space-sm $space-md;
    background: $sc-lavender;
    border-radius: $radius-sm;
  }

  &__log {
    background: $sc-dark;
    border-radius: $radius-md;
    padding: $space-md;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    font-family: monospace;
    font-size: 12px;
    line-height: 1.8;

    @include mobile {
      font-size: 11px;
      padding: $space-sm;
      min-height: 150px;
      max-height: 300px;
    }
  }

  &__empty {
    color: $sc-gray;
    text-align: center;
    padding: $space-xl 0;
  }

  &__event {
    display: flex;
    gap: $space-sm;
    align-items: flex-start;

    @include mobile {
      flex-wrap: wrap;
      gap: $space-xs;
    }
  }

  &__time {
    color: $sc-gray;
    flex-shrink: 0;
  }

  &__tag {
    padding: 0 $space-xs;
    border-radius: 2px;
    font-weight: 700;
    font-size: 11px;
    flex-shrink: 0;

    &--connect { background: #166534; color: #DCFCE7; }
    &--disconnect { background: #991B1B; color: #FEE2E2; }
    &--data { background: #1E3A5F; color: #93C5FD; }
  }

  &__payload {
    color: $sc-green;
    white-space: pre-wrap;
    word-break: break-all;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

<template>
  <div v-if="response" class="endpoint__response">
    <div class="endpoint__meta">
      <span
        class="endpoint__status"
        :class="{
          'endpoint__status--ok': response.status >= 200 && response.status < 300,
          'endpoint__status--err': response.status >= 400 || response.status === 0,
        }"
      >
        {{ response.status }}
      </span>
      <span class="endpoint__time">{{ response.time }}ms</span>
    </div>
    <div class="endpoint__curl">
      <code>{{ curlPreview }}</code>
    </div>
    <pre class="endpoint__json">{{ response.body }}</pre>
  </div>
</template>

<script setup lang="ts">
export interface ApiResponse {
  status: number;
  time: number;
  body: string;
}

defineProps<{
  response: ApiResponse | null;
  curlPreview: string;
}>();
</script>

<style scoped lang="scss">
.endpoint {
  &__response {
    margin-top: $space-md;
    border-top: 1px solid $sc-gray-light;
    padding-top: $space-md;
  }

  &__meta {
    display: flex;
    gap: $space-sm;
    margin-bottom: $space-sm;
  }

  &__status {
    padding: 1px $space-sm;
    border-radius: $radius-sm;
    font-size: 12px;
    font-weight: 700;

    &--ok { background: #DCFCE7; color: #166534; }
    &--err { background: #FEE2E2; color: #991B1B; }
  }

  &__time {
    font-size: 12px;
    color: $sc-gray;
    font-variant-numeric: tabular-nums;
  }

  &__curl {
    margin-bottom: $space-sm;

    code {
      font-size: 12px;
      background: $sc-dark;
      color: $sc-green;
      padding: $space-xs $space-sm;
      border-radius: $radius-sm;
      display: inline-block;
      max-width: 100%;
      overflow-x: auto;
    }
  }

  &__json {
    background: $sc-dark;
    color: $sc-green;
    padding: $space-md;
    border-radius: $radius-md;
    font-size: 12px;
    line-height: 1.5;
    overflow-x: auto;
    max-height: 300px;
    overflow-y: auto;
    margin: 0;

    @include mobile {
      font-size: 11px;
      padding: $space-sm;
      max-height: 200px;
    }
  }
}
</style>

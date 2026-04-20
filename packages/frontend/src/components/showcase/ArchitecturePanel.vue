<template>
  <div class="arch">
    <div class="arch__diagram">
      <div class="arch__box arch__box--frontend">
        <div class="arch__label">Frontend</div>
        <div class="arch__tech">Vue 3 + TypeScript + SCSS</div>
        <ul class="arch__list">
          <li>Reactive match dashboard</li>
          <li>Socket.io client with auto-reconnect</li>
          <li>Statscore design system</li>
        </ul>
      </div>
      <div class="arch__arrows">
        <div class="arch__arrow">
          <span>REST</span>
          <span class="arch__line arch__line--h">&rarr;</span>
          <span class="arch__line arch__line--v">&darr;</span>
        </div>
        <div class="arch__arrow">
          <span class="arch__line arch__line--h">&larr;</span>
          <span class="arch__line arch__line--v">&uarr;</span>
          <span>WebSocket</span>
        </div>
      </div>
      <div class="arch__box arch__box--backend">
        <div class="arch__label">Backend</div>
        <div class="arch__tech">NestJS + Socket.io</div>
        <ul class="arch__list">
          <li>Config-driven sport parsing</li>
          <li>WebSocket gateway</li>
          <li>Helmet + CORS + rate limiting</li>
          <li>class-validator DTOs</li>
        </ul>
      </div>
      <div class="arch__arrows">
        <div class="arch__arrow">
          <span class="arch__line arch__line--h">&harr;</span>
          <span class="arch__line arch__line--v">&updownarrow;</span>
          <span>Firestore SDK</span>
        </div>
      </div>
      <div class="arch__box arch__box--db">
        <div class="arch__label">Firestore</div>
        <div class="arch__tech">Firebase (statscoreapp)</div>
        <ul class="arch__list">
          <li>Real-time onSnapshot listener</li>
          <li>In-memory fallback when offline</li>
        </ul>
      </div>
    </div>

    <div class="arch__features">
      <h3>Production-Grade Features</h3>
      <div class="arch__grid">
        <div class="arch__feature" v-for="f in features" :key="f.title">
          <div class="arch__feature-title">{{ f.title }}</div>
          <div class="arch__feature-desc">{{ f.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Config-Driven Parsing',
    desc: 'Single SPORT_CONFIG map replaces all if/else chains. Adding a new sport = one line.',
  },
  {
    title: 'Security Essentials',
    desc: 'Helmet headers, CORS whitelist, @nestjs/throttler rate limiting, ValidationPipe.',
  },
  {
    title: 'Real-Time WebSocket',
    desc: 'Score changes broadcast instantly via Socket.io gateway with auto-reconnect.',
  },
  {
    title: 'Shared Types',
    desc: 'Monorepo @sc-test/shared package ensures type safety across frontend & backend.',
  },
  {
    title: 'Firestore + Fallback',
    desc: 'Firebase Firestore with onSnapshot. Falls back to in-memory when credentials unavailable.',
  },
  {
    title: 'Input Validation',
    desc: 'class-validator DTOs with whitelist + forbidNonWhitelisted on all endpoints.',
  },
  {
    title: 'npm Workspaces',
    desc: 'Monorepo with shared/, backend/, frontend/ packages. Single npm install.',
  },
  {
    title: 'Dual CJS/ESM Build',
    desc: 'Shared package builds to both CommonJS (NestJS) and ESM (Vite) targets.',
  },
];
</script>

<style scoped lang="scss">
.arch {
  display: flex;
  flex-direction: column;
  gap: $space-xl;

  &__diagram {
    display: flex;
    align-items: center;
    gap: $space-md;
    overflow-x: auto;
    padding: $space-md 0;

    @include mobile {
      flex-direction: column;
    }
  }

  &__box {
    @include card;
    padding: $space-lg;
    min-width: 200px;
    flex: 1;
    border-top: 3px solid $sc-gray;

    &--frontend { border-top-color: $sc-green; }
    &--backend { border-top-color: $sc-purple; }
    &--db { border-top-color: #F59E0B; }

    @include mobile {
      min-width: 0;
      width: 100%;
      padding: $space-md;
    }
  }

  &__label {
    font-weight: 700;
    font-size: 1rem;
    color: $sc-dark;
    margin-bottom: $space-xs;
  }

  &__tech {
    font-size: 12px;
    color: $sc-gray;
    margin-bottom: $space-sm;
  }

  &__list {
    list-style: none;
    padding: 0;
    font-size: 12px;
    color: $sc-dark;

    li {
      padding: 2px 0;

      &::before {
        content: "\2022";
        color: $sc-green;
        font-weight: bold;
        margin-right: $space-xs;
      }
    }
  }

  &__arrows {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-xs;
    flex-shrink: 0;

    @include mobile {
      flex-direction: column;
      gap: $space-xs;
      padding: $space-xs 0;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    gap: $space-xs;
    font-size: 11px;
    color: $sc-gray;
    white-space: nowrap;
  }

  &__line {
    font-size: 18px;
    color: $sc-purple-light;

    &--h {
      @include mobile { display: none; }
    }

    &--v {
      display: none;
      @include mobile { display: inline; }
    }
  }

  &__features {
    h3 {
      margin-bottom: $space-lg;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: $space-md;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__feature {
    @include card;
    padding: $space-md;

    &-title {
      font-weight: 700;
      font-size: 14px;
      color: $sc-purple;
      margin-bottom: $space-xs;
    }

    &-desc {
      font-size: 12px;
      color: $sc-dark;
      line-height: 1.5;
    }
  }
}
</style>

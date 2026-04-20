<template>
  <section class="problems">
    <h2 class="problems__title">12 Problems Fixed</h2>
    <p class="problems__intro">
      Issues identified in the original <code>app.js</code> and how the refactored solution addresses each one.
    </p>

    <div class="problems__list">
      <div
        v-for="(p, i) in PROBLEMS"
        :key="i"
        class="problems__item"
        :class="{ 'problems__item--open': openIndex === i }"
      >
        <button class="problems__header" @click="toggle(i)">
          <span class="problems__number">#{{ i + 1 }}</span>
          <span class="problems__name">{{ p.title }}</span>
          <span class="problems__chevron">{{ openIndex === i ? '−' : '+' }}</span>
        </button>
        <div v-if="openIndex === i" class="problems__body">
          <div class="problems__section">
            <div class="problems__label">Problem</div>
            <p>{{ p.description }}</p>
          </div>
          <div class="problems__section problems__section--fix">
            <div class="problems__label problems__label--fix">Fix</div>
            <p>{{ p.fix }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PROBLEMS } from '../../data/problemsData';

const openIndex = ref<number | null>(null);

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i;
}
</script>

<style scoped lang="scss">
.problems {
  &__title {
    font-size: 1.25rem;
    margin-bottom: $space-xs;
  }

  &__intro {
    font-size: 13px;
    color: $sc-gray;
    margin-bottom: $space-lg;

    code {
      background: $sc-lavender;
      padding: 2px 6px;
      border-radius: 3px;
      color: $sc-purple;
      font-size: 12px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  &__item {
    @include card;
    overflow: hidden;
    transition: box-shadow 0.2s;

    &--open {
      box-shadow: $shadow-card-hover;
    }
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-md;
    border: none;
    background: none;
    cursor: pointer;
    font-family: $font-body;
    font-size: 14px;
    text-align: left;

    &:hover {
      background: $sc-gray-light;
    }
  }

  &__number {
    font-weight: 700;
    font-size: 12px;
    color: $sc-purple;
    background: $sc-lavender;
    padding: 2px 8px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  &__name {
    font-weight: 600;
    color: $sc-dark;
    flex: 1;
  }

  &__chevron {
    font-size: 18px;
    color: $sc-gray;
    flex-shrink: 0;
    width: 24px;
    text-align: center;
  }

  &__body {
    padding: 0 $space-md $space-md;
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  &__section {
    font-size: 13px;
    line-height: 1.6;
    color: $sc-dark;

    &--fix {
      background: rgba($sc-green, 0.06);
      padding: $space-sm $space-md;
      border-radius: $radius-sm;
      border-left: 3px solid $sc-green;
    }

    p { margin: $space-xs 0 0; }
  }

  &__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: $sc-red;

    &--fix {
      color: $sc-green-accessible;
    }
  }
}
</style>

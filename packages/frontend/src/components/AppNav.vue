<template>
  <nav class="app-nav">
    <div class="app-nav__inner">
      <RouterLink to="/" class="app-nav__brand">
        <span>stats</span><span class="app-nav__brand-o">d</span
        ><span>ash</span>
      </RouterLink>
      <div class="app-nav__links">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="app-nav__link"
          :class="{ 'app-nav__link--active': isActive(link) }"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const links = [
  { to: "/", label: "Demo", exact: true },
  { to: "/how-it-works", label: "How It Works", exact: false },
  { to: "/problems", label: "Problems", exact: false },
  { to: "/showcase", label: "API", exact: false },
];

function isActive(link: { to: string; exact: boolean }) {
  if (link.exact) return route.path === link.to;
  return route.path.startsWith(link.to);
}
</script>

<style scoped lang="scss">
.app-nav {
  background: $sc-dark;

  &__inner {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $space-md;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;

    @include mobile {
      height: 52px;
    }
  }

  &__brand {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 700;
    color: $sc-white;
    text-decoration: none;
    letter-spacing: -0.02em;

    @include mobile {
      font-size: 1.25rem;
    }
  }

  &__brand-o {
    color: $sc-green;
  }

  &__links {
    display: flex;
    gap: $space-xs;
    align-items: center;
  }

  &__link {
    padding: $space-xs $space-md;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba($sc-white, 0.7);
    text-decoration: none;
    border-radius: $radius-sm;
    transition: all 0.2s;

    &:hover {
      color: $sc-white;
    }

    &--active {
      color: $sc-green;
    }

    @include mobile {
      padding: $space-xs $space-sm;
      font-size: 12px;
    }
  }
}
</style>

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

      <button
        class="app-nav__burger"
        :class="{ 'app-nav__burger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" class="app-nav__mobile-menu">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="app-nav__mobile-link"
          :class="{ 'app-nav__mobile-link--active': isActive(link) }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const menuOpen = ref(false);

watch(() => route.path, () => { menuOpen.value = false; });

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
  position: relative;

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

  // Desktop links
  &__links {
    display: flex;
    gap: $space-xs;
    align-items: center;

    @include mobile {
      display: none;
    }
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
  }

  // Hamburger button
  &__burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    @include mobile {
      display: flex;
    }

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: $sc-white;
      border-radius: 1px;
      transition: all 0.3s;
      transform-origin: center;
    }

    &--open {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  // Mobile dropdown menu
  &__mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: $sc-dark;
    padding: $space-sm $space-md $space-md;
    z-index: 100;
    border-top: 1px solid rgba($sc-white, 0.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

    @include mobile {
      display: flex;
      flex-direction: column;
    }
  }

  &__mobile-link {
    padding: $space-sm $space-md;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba($sc-white, 0.7);
    text-decoration: none;
    border-radius: $radius-sm;
    transition: all 0.2s;

    &:hover {
      color: $sc-white;
      background: rgba($sc-white, 0.08);
    }

    &--active {
      color: $sc-green;
    }
  }
}

// Slide transition
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
